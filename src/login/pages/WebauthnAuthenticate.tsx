import { useRef, useState } from "react";
import type { MessageKey } from "keycloakify/login/i18n/i18n";
import { base64url } from "rfc4648";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { assert } from "tsafe/assert";
import { is } from "tsafe/is";
import { typeGuard } from "tsafe/typeGuard";

export default function WebauthnAuthenticate(props: PageProps<Extract<KcContext, { pageId: "webauthn-authenticate.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url } = kcContext;
  const { msg, msgStr } = i18n;

  const { authenticators, challenge, shouldDisplayAuthenticators, userVerification, rpId } = kcContext;
  const createTimeout = Number(kcContext.createTimeout);
  const isUserIdentified = kcContext.isUserIdentified == "true";

  const formElementRef = useRef<HTMLFormElement>(null);

  const webAuthnAuthenticate = useConstCallback(async () => {
    if (!isUserIdentified) {
      return;
    }

    const submitForm = async (): Promise<void> => {
      const formElement = formElementRef.current;

      if (formElement === null) {
        await new Promise(resolve => setTimeout(resolve, 100));
        return submitForm();
      }

      formElement.submit();
    };

    const allowCredentials = authenticators.authenticators.map(
      authenticator =>
        ({
          id: base64url.parse(authenticator.credentialId, { loose: true }),
          type: "public-key"
        } as PublicKeyCredentialDescriptor)
    );
    // Check if WebAuthn is supported by this browser
    if (!window.PublicKeyCredential) {
      setError(msgStr("webauthn-unsupported-browser-text"));
      submitForm();
      return;
    }

    const publicKey: PublicKeyCredentialRequestOptions = {
      rpId,
      challenge: base64url.parse(challenge, { loose: true })
    };

    if (createTimeout !== 0) {
      publicKey.timeout = createTimeout * 1000;
    }

    if (allowCredentials.length) {
      publicKey.allowCredentials = allowCredentials;
    }

    if (userVerification !== "not specified") {
      publicKey.userVerification = userVerification;
    }

    try {
      const result = await navigator.credentials.get({ publicKey });
      if (!result || result.type != "public-key") {
        return;
      }
      assert(is<PublicKeyCredential>(result));
      if (!("authenticatorData" in result.response)) {
        return;
      }
      const response = result.response;

      const clientDataJSON = response.clientDataJSON;

      assert(
        typeGuard<AuthenticatorAssertionResponse>(response, "signature" in response && response.authenticatorData instanceof ArrayBuffer),
        "response not an AuthenticatorAssertionResponse"
      );

      const authenticatorData = response.authenticatorData;
      const signature = response.signature;

      setClientDataJSON(base64url.stringify(new Uint8Array(clientDataJSON), { "pad": false }));
      setAuthenticatorData(base64url.stringify(new Uint8Array(authenticatorData), { "pad": false }));
      setSignature(base64url.stringify(new Uint8Array(signature), { "pad": false }));
      setCredentialId(result.id);
      setUserHandle(base64url.stringify(new Uint8Array(response.userHandle!), { "pad": false }));
    } catch (err) {
      setError(String(err));
    }

    await submitForm();
  });

  const [clientDataJSON, setClientDataJSON] = useState("");
  const [authenticatorData, setAuthenticatorData] = useState("");
  const [signature, setSignature] = useState("");
  const [credentialId, setCredentialId] = useState("");
  const [userHandle, setUserHandle] = useState("");
  const [error, setError] = useState("");

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={<></>}>

      <div>
        <form action={url.loginAction} ref={formElementRef} method="post">
          <input type="hidden" id="clientDataJSON" name="clientDataJSON" value={clientDataJSON} />
          <input type="hidden" id="authenticatorData" name="authenticatorData" value={authenticatorData} />
          <input type="hidden" id="signature" name="signature" value={signature} />
          <input type="hidden" id="credentialId" name="credentialId" value={credentialId} />
          <input type="hidden" id="userHandle" name="userHandle" value={userHandle} />
          <input type="hidden" id="error" name="error" value={error} />
        </form>

        <div>
          {/* TODO */}
          {authenticators &&
            (() => (
              <form id="authn_select">
                {authenticators.authenticators.map(authenticator => (
                  <input type="hidden" name="authn_use_chk" value={authenticator.credentialId} key={authenticator.credentialId} />
                ))}
              </form>
            ))()}
          {authenticators &&
            shouldDisplayAuthenticators &&
            (() => (
              <>
                {authenticators.authenticators.length > 1 && (
                  <p>{msg("webauthn-available-authenticators")}</p>
                )}
                <div>
                  {authenticators.authenticators.map(authenticator => (
                    <div id="kc-webauthn-authenticator">
                      <div>
                        {authenticator.transports.iconClass}
                      </div>
                      <div>
                        <div>
                          {authenticator.label}
                        </div>

                        {authenticator.transports && authenticator.transports.displayNameProperties.length && (
                          <div>
                            {authenticator.transports.displayNameProperties.map(
                              (transport: MessageKey, index: number) => (
                                <>
                                  <span>{msg(transport)}</span>
                                  {index < authenticator.transports.displayNameProperties.length - 1 && (
                                    <span>{", "}</span>
                                  )}
                                </>
                              )
                            )}
                          </div>
                        )}

                        <div>
                          <span id="kc-webauthn-authenticator-created-label">{msg("webauthn-createdAt-label")}</span>
                          <span id="kc-webauthn-authenticator-created">{authenticator.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ))()}
        </div>
      </div>

      <div className="prose dark:prose-invert text-center pb-4">
        <h1>{msgStr("webauthn-login-title")}</h1>
      </div>

      <button
        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        autoFocus={true}
        type="button"
        onClick={webAuthnAuthenticate}
      >
        {msgStr("webauthn-doAuthenticate")}
      </button>
    </Template>
  );
}