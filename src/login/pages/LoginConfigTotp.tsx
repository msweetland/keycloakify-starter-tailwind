import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { MessageKey } from "keycloakify/login/i18n/i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretRight, faKey, faMobileScreen} from "@fortawesome/free-solid-svg-icons";

export default function LoginConfigTotp(props: PageProps<Extract<KcContext, { pageId: "login-config-totp.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, isAppInitiatedAction, totp, mode, messagesPerField } = kcContext;
  const { msgStr } = i18n;

  const algToKeyUriAlg: Record<(typeof kcContext)["totp"]["policy"]["algorithm"], string> = {
    "HmacSHA1": "SHA1",
    "HmacSHA256": "SHA256",
    "HmacSHA512": "SHA512"
  };

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={<></>}>

      <div className="prose dark:prose-invert text-center pb-4">
        <h1>{msgStr("loginTotpTitle")}</h1>
      </div>

      <form action={url.loginAction} method="post" className="prose dark:prose-invert">

        <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />
        {mode && <input type="hidden" id="mode" value={mode} />}

        <div className="prose-gray px-4">
          <ol>

            <li>
              <span>{msgStr("loginTotpStep1")}</span>
              <ul>
                {totp.supportedApplications.map(app => (
                  <li>{msgStr(app as MessageKey)}</li>
                ))}
              </ul>
            </li>

            {!(mode && mode === "manual") && (
              <li className="pb-2">
                <span>{msgStr("loginTotpStep2")}</span>
                <div className="flex flex-col items-center justify-around">
                  <img src={`data:image/png;base64, ${totp.totpSecretQrCode}`} alt="Figure: Barcode" className="rounded-lg"/>
                  <a className="not-prose inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500" href={totp.manualUrl}>
                    {msgStr("loginTotpUnableToScan")}
                    <FontAwesomeIcon icon={faCaretRight} className="flex-shrink-0 size-4" />
                  </a>
                </div>
              </li>
            )}

            {mode && mode === "manual" && (
              <>
                <li>
                  <p>{msgStr("loginTotpManualStep2")}</p>
                  <div className="flex flex-col items-center justify-around space-y-4">
                    <div className="bg-blue-100 border border-blue-200 text-sm text-blue-800 rounded-lg p-4 dark:bg-blue-800/10 dark:border-blue-900 dark:text-blue-500" role="alert">
                      <span className="font-bold font-mono">{totp.totpSecretEncoded}</span>
                    </div>
                    <a className="not-prose inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500" href={totp.qrUrl}>
                      {msgStr("loginTotpScanBarcode")}
                      <FontAwesomeIcon icon={faCaretRight} className="flex-shrink-0 size-4" />
                    </a>
                  </div>
                </li>

                <li>
                  <p>{msgStr("loginTotpManualStep3")}</p>
                  <p>
                    <ul>
                      <li>{msgStr("loginTotpType")}: {msgStr(`loginTotp.${totp.policy.type}`)}</li>
                      <li>{msgStr("loginTotpAlgorithm")}: {algToKeyUriAlg?.[totp.policy.algorithm] ?? totp.policy.algorithm}</li>
                      <li>{msgStr("loginTotpDigits")}: {totp.policy.digits}</li>
                      {totp.policy.type === "totp" ? (
                        <li>{msgStr("loginTotpInterval")}: {totp.policy.period}</li>
                      ) : (
                        <li>{msgStr("loginTotpCounter")}: {totp.policy.initialCounter}</li>
                      )}
                    </ul>
                  </p>
                </li>
              </>
            )}

            <li>
              <p>{msgStr("loginTotpStep3")}</p>
              <div className="-ml-8">
                <label
                  htmlFor="totp"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  {msgStr("authenticatorCode")}
                </label>
                <div className="relative">
                  <input
                    className="peer py-3 px-4 ps-11 pe-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-neutral-600"
                    type="text"
                    id="totp"
                    name="totp"
                    autoComplete="off"
                    aria-invalid={messagesPerField.existsError("totp")}
                    required={true}
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                    <FontAwesomeIcon icon={faKey} className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500" />
                  </div>
                </div>

                {messagesPerField.existsError("totp") && (
                  <span className="text-sm text-red-600 mt-2" aria-live="polite">
                    {messagesPerField.get("totp")}
                  </span>
                )}
              </div>
            </li>

            <li>
              <p>{msgStr("loginTotpStep3DeviceName")}</p>
              <div className="-ml-8">
                <label
                  htmlFor="userLabel"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  {msgStr("loginTotpDeviceName")}
                </label>
                <div className="relative">
                  <input
                    className="peer py-3 px-4 ps-11 pe-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-neutral-600"
                    type="text"
                    id="userLabel"
                    name="userLabel"
                    autoComplete="off"
                    aria-invalid={messagesPerField.existsError("userLabel")}
                    required={totp.otpCredentials.length >= 1}
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                    <FontAwesomeIcon icon={faMobileScreen} className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500" />
                  </div>
                </div>

                {messagesPerField.existsError("userLabel") && (
                  <span className="text-sm text-red-600 mt-2" aria-live="polite">
              {messagesPerField.get("userLabel")}
            </span>
                )}
              </div>
            </li>

          </ol>

          <div className="flex flex-col space-y-4">
            <button
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              type="submit"
            >
              {msgStr("doSubmit")}
            </button>

            {isAppInitiatedAction && (
              <button
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                type="submit"
                name="cancel-aia"
                value="true"
              >
                {msgStr("doCancel")}
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Form at bottom */}
      {/*<form action={url.loginAction} method="post" className="flex flex-col space-y-4">*/}

      {/*  <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />*/}
      {/*  {mode && <input type="hidden" id="mode" value={mode} />}*/}

      {/*  <div>*/}
      {/*    <label*/}
      {/*      htmlFor="totp"*/}
      {/*      className="block text-sm font-medium mb-2 dark:text-white"*/}
      {/*    >*/}
      {/*      {msgStr("authenticatorCode")}*/}
      {/*      /!*{totp.otpCredentials.length >= 1 && <span className="required">*</span>}*!/*/}
      {/*    </label>*/}
      {/*    <div className="relative">*/}
      {/*      <input*/}
      {/*        className="peer py-3 px-4 ps-11 pe-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-neutral-600"*/}
      {/*        type="text"*/}
      {/*        id="totp"*/}
      {/*        name="totp"*/}
      {/*        autoComplete="off"*/}
      {/*        aria-invalid={messagesPerField.existsError("totp")}*/}
      {/*        required={true}*/}
      {/*      />*/}
      {/*      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">*/}
      {/*        <FontAwesomeIcon icon={faKey} className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500" />*/}
      {/*      </div>*/}
      {/*    </div>*/}

      {/*    {messagesPerField.existsError("totp") && (*/}
      {/*      <span className="text-sm text-red-600 mt-2" aria-live="polite">*/}
      {/*        {messagesPerField.get("totp")}*/}
      {/*      </span>*/}
      {/*    )}*/}
      {/*  </div>*/}

      {/*  <div>*/}
      {/*    <label*/}
      {/*      htmlFor="userLabel"*/}
      {/*      className="block text-sm font-medium mb-2 dark:text-white"*/}
      {/*    >*/}
      {/*      {msgStr("loginTotpDeviceName")}*/}
      {/*    </label>*/}
      {/*    <div className="relative">*/}
      {/*      <input*/}
      {/*        className="peer py-3 px-4 ps-11 pe-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-neutral-600"*/}
      {/*        type="text"*/}
      {/*        id="userLabel"*/}
      {/*        name="userLabel"*/}
      {/*        autoComplete="off"*/}
      {/*        aria-invalid={messagesPerField.existsError("userLabel")}*/}
      {/*        required={totp.otpCredentials.length >= 1}*/}
      {/*      />*/}
      {/*      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">*/}
      {/*        <FontAwesomeIcon icon={faMobileScreen} className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500" />*/}
      {/*      </div>*/}
      {/*    </div>*/}

      {/*    {messagesPerField.existsError("userLabel") && (*/}
      {/*      <span className="text-sm text-red-600 mt-2" aria-live="polite">*/}
      {/*        {messagesPerField.get("userLabel")}*/}
      {/*      </span>*/}
      {/*    )}*/}
      {/*  </div>*/}


      {/*  <button*/}
      {/*    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"*/}
      {/*    type="submit"*/}
      {/*  >*/}
      {/*    {msgStr("doSubmit")}*/}
      {/*  </button>*/}

      {/*  {isAppInitiatedAction && (*/}
      {/*    <button*/}
      {/*      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"*/}
      {/*      type="submit"*/}
      {/*      name="cancel-aia"*/}
      {/*      value="true"*/}
      {/*    >*/}
      {/*      {msgStr("doCancel")}*/}
      {/*    </button>*/}
      {/*  )}*/}
      {/*</form>*/}
    </Template>
  );
}