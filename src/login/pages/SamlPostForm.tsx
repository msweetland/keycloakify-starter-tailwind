import { useEffect, useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function SamlPostForm(props: PageProps<Extract<KcContext, { pageId: "saml-post-form.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { msgStr, msg } = i18n;

  const { samlPost } = kcContext;
  const [htmlFormElement, setHtmlFormElement] = useState<HTMLFormElement | null>(null);

  useEffect(() => {
    if (htmlFormElement === null) {
      return;
    }

    // Storybook
    if (samlPost.url === "") {
      alert("In a real Keycloak the user would be redirected immediately");
      return;
    }

    htmlFormElement.submit();
  }, [htmlFormElement]);

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} displayMessage={false} headerNode={<></>}>
      <div className="prose dark:prose-invert text-center">
        <h2>{msgStr("saml.post-form.title")}</h2>
        <p className="prose-gray">{msgStr("saml.post-form.message")}</p>
      </div>

      <form name="saml-post-binding" method="post" action={samlPost.url} ref={setHtmlFormElement} className="flex flex-col space-y-4">
        {samlPost.SAMLRequest && <input type="hidden" name="SAMLRequest" value={samlPost.SAMLRequest} />}
        {samlPost.SAMLResponse && <input type="hidden" name="SAMLResponse" value={samlPost.SAMLResponse} />}
        {samlPost.relayState && <input type="hidden" name="RelayState" value={samlPost.relayState} />}
        <noscript>
          <div className="mt-2 bg-yellow-100 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500" role="alert">
            <span className="font-bold">{msg("saml.post-form.js-disabled")}</span>
          </div>
          <input
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            type="submit"
            value={msgStr("doContinue")}
          />
        </noscript>
      </form>

    </Template>
  );
}