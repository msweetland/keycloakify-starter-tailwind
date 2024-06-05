import {type FormEventHandler, useState} from "react";
import {useConstCallback} from "keycloakify/tools/useConstCallback";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "../kcContext";
import type {I18n} from "../i18n";
import SocialLoginButton from "../../components/SocialLoginButton.tsx";
import {getSocialProviderConfig} from "../socialProviderConfig.ts";
import UsernameInput from "../components/UsernameInput.tsx";
import PasswordInput from "../components/PasswordInput.tsx";
import SubmitButton from "../components/SubmitButton.tsx";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
  const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;
  const {social, realm, url, usernameHidden, auth, registrationDisabled} = kcContext;
  const {msgStr} = i18n;

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
    e.preventDefault();
    setIsSubmitted(true);
    (e.target as HTMLFormElement).submit();
  });


  return (
    <Template
      {...{kcContext, i18n, doUseDefaultCss, classes}}
      headerNode={<></>}
    >

      <div className="prose dark:prose-invert text-center pb-4">
        <h1>{msgStr("doLogIn")}</h1>
      </div>
      
      <div className="flex flex-col space-y-4">

        {/* Password Login */}
        {realm.password && (
          <form
            className="flex flex-col space-y-4"
            onSubmit={onSubmit}
            action={url.loginAction}
            method="post"
          >
            {!usernameHidden && <UsernameInput {...{...props, isSubmitted }} />}

            {/* Password Input*/}
            <PasswordInput {...{...props, isSubmitted }} />

            {/* Remember Me */}
            {(realm.rememberMe && !usernameHidden) && (
              <div className="flex">
                <input
                  type="checkbox"
                  className="shrink-0 mt-0.5 border border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  id="rememberMe"
                  name="rememberMe"
                  disabled={isSubmitted}
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-500 ms-3 dark:text-neutral-400">{msgStr("rememberMe")}</label>
              </div>
            )}

            <input
              type="hidden"
              name="credentialId"
              value={auth?.selectedCredential || ''}
            />

            <SubmitButton {...{...props, isSubmitted }} />

          </form>
        )}

        {/* Social Login */}
        {social.providers && (
            <div className="flex flex-col space-y-4">
              <div className="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">{msgStr("identity-provider-login-label")}</div>
              <ul className="flex flex-col space-y-4">
                {social.providers.map(getSocialProviderConfig).map(
                  socialProviderConfig =>
                    <li key={socialProviderConfig.providerId}>
                      <SocialLoginButton {...socialProviderConfig} />
                    </li>
                )}
              </ul>
            </div>
          )
        }

        {/* Registration Link */}
        {realm.password && realm.registrationAllowed && !registrationDisabled && (
          <div className="flex flex-col space-y-4">
            <div className="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">{msgStr("noAccount")}</div>
            <a className="w-full justify-center py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:hover:text-white" href={url.registrationUrl}> {msgStr("doRegister")}</a>
          </div>
        )}

      </div>
    </Template>
  );
}
