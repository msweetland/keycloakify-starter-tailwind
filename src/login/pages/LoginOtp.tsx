import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "../kcContext";
import type {I18n} from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey} from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../components/SubmitButton.tsx";

export default function LoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { otpLogin, url } = kcContext;
  const { msgStr } = i18n;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={<></>}>

      <div className="prose dark:prose-invert text-center pb-4">
        <h1>{msgStr("doLogIn")}</h1>
        {/* TODO add instructions to page */}
      </div>

      <form className="flex flex-col space-y-4" action={url.loginAction} method="post">

        {otpLogin.userOtpCredentials.length > 1 && (
          <div className="flex flex-col space-y-4 bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
              {/*passkey-autofill-select*/}
              {otpLogin.userOtpCredentials.map((otpCredential, index) => (

                <div key={otpCredential.id} className="flex">
                  <input value={otpCredential.id} type="radio" id={`kc-otp-credential-${index}`} name="selectedCredentialId" className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                  <label htmlFor={`kc-otp-credential-${index}`} className="text-sm text-gray-500 ms-2 dark:text-neutral-400">{otpCredential.userLabel}</label>
                </div>
              ))}
          </div>
        )}

        {/* TODO change to pin input */}
        <div>
          <label
            htmlFor="otp"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            {msgStr("loginOtpOneTime")}
          </label>
          <div className="w-full relative">
            <input
              type="text"
              id="otp"
              name="otp"
              autoComplete="off"
              className="peer py-3 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-neutral-600"
              autoFocus={true}
            />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
              <FontAwesomeIcon
                icon={faKey}
                className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500"
              />
            </div>
          </div>
        </div>

        <SubmitButton {...{...props, isSubmitted: false}} />
      </form>
    </Template>
  );
}