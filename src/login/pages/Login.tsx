import {ChangeEvent, type FormEventHandler, useState} from "react";
import {useConstCallback} from "keycloakify/tools/useConstCallback";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "../kcContext";
import type {I18n} from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey, faUser} from "@fortawesome/free-solid-svg-icons";
import SocialLoginButton from "../../components/SocialLoginButton.tsx";
import {getSocialProviderConfig} from "../socialProviderConfig.ts";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
  const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;
  const {social, realm, url, usernameHidden, login, auth, registrationDisabled} = kcContext;
  const {msg, msgStr} = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const [shouldRememberPassword, setShouldRememberPassword] = useState<boolean>(login.rememberMe === "on" || false);

  const handleRememberPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setShouldRememberPassword(checked);
  };


  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
    e.preventDefault();
    setIsLoginButtonDisabled(true);
    const formElement = e.target as HTMLFormElement;
    formElement.querySelector("input[name='email']")?.setAttribute("name", "username");
    formElement.submit();
  });

  const getUsernameLabel = () => {
    if (!realm.loginWithEmailAllowed) {
      return "username";
    } else if (realm.registrationEmailAsUsername) {
      return "email";
    } else {
      return "usernameOrEmail";
    }
  }

  function getAutoCompleteHelper(label: string): string {
    return label === "usernameOrEmail" ? "username" : label;
  }

  return (
    <Template
      {...{kcContext, i18n, doUseDefaultCss, classes}}
      headerNode={<></>}
    >
      <div>

        {/* Password Login */}
        {realm.password && (
          <form
            onSubmit={onSubmit}
            action={url.loginAction}
            method="post"
          >
            {!usernameHidden && (
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">{msg(getUsernameLabel())}</span>
                </div>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  {getUsernameLabel() == "email" ? <FontAwesomeIcon icon={faEnvelope}/> : <FontAwesomeIcon icon={faUser}/>}
                  <input
                    className="grow w-full"
                    name={getAutoCompleteHelper(getUsernameLabel())}
                    defaultValue={login.username ?? ""}
                    type="text"
                    autoFocus={true}
                    autoComplete="off"
                  />
                </label>
              </label>
            )}

            {/* Password Input*/}
            <label className="form-control w-full mt-2">
              <div className="label">
                <span className="label-text">{msgStr("password")}</span>
              </div>
              <label className="input input-bordered flex items-center gap-2 w-full">
                <FontAwesomeIcon icon={faKey}/>
                <input
                  className="grow w-full"
                  name="password"
                  type="password"
                  autoComplete="off"
                />
              </label>

              {/* Forgot Password link */}
              {realm.resetPasswordAllowed && (
                <div className="label">
                  <a className="label-text-alt link link-hover" href={url.loginResetCredentialsUrl}>
                    {msgStr("doForgotPassword")}
                  </a>
                </div>
              )}
            </label>

            <input
              type="hidden"
              name="credentialId"
              value={auth?.selectedCredential || ''}
            />

            <input
              className={`btn btn-primary w-full ${realm.resetPasswordAllowed ? "mt-4" : "mt-10"}`}
              name="login"
              type="submit"
              value={msgStr("doLogIn")}
              disabled={isLoginButtonDisabled}
            />

            {/* Remember Me */}
            {(realm.rememberMe && !usernameHidden) && (
              <div className="form-control mt-4">
                <label className="label cursor-pointer justify-start space-x-2">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={shouldRememberPassword}
                    onChange={handleRememberPasswordChange}
                  />
                  <span className="label-text">{msgStr("rememberMe")}</span>
                </label>
              </div>
            )}
          </form>
        )}

        {/* Social Login */}
        {social.providers && (
            <div>
              <div className="divider my-8">{msgStr("identity-provider-login-label")}</div>
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
          <div>
            <div className="divider my-8">{msgStr("noAccount")}</div>
            <a className="btn neutral w-full" href={url.registrationUrl}> {msgStr("doRegister")}</a>
          </div>
        )}

      </div>
    </Template>
  );
}
