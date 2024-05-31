import {ChangeEvent, type FormEventHandler, useState} from "react";
import {clsx} from "keycloakify/tools/clsx";
import {useConstCallback} from "keycloakify/tools/useConstCallback";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "../kcContext";
import type {I18n} from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey, faUser} from "@fortawesome/free-solid-svg-icons";

const my_custom_param = new URL(window.location.href).searchParams.get("my_custom_param");

if (my_custom_param !== null) {
  console.log("my_custom_param:", my_custom_param);
}

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
  const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;

  console.log(kcContext);


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

    //NOTE: Even if we login with email Keycloak expect username and password in
    //the POST request.
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
        {/*<h1 id="kc-page-title">{msgStr("doLogIn")}</h1>*/}
        {realm.password && (
          <form
            className="flex flex-col space-y-4"
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
            <label className="form-control w-full">
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
              className="btn btn-primary w-full"
              name="login"
              type="submit"
              value={msgStr("doLogIn")}
              disabled={isLoginButtonDisabled}
            />

            {realm.rememberMe && !usernameHidden && (
              <div className="form-control">
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

            {/* Registration Link*/}
            {realm.registrationAllowed && !registrationDisabled && (
              <div>
                <div className="divider">{msgStr("noAccount")}</div>
                <a className="btn neutral w-full" href={url.registrationUrl}> {msgStr("doRegister")}</a>
              </div>
            )}

          </form>
        )}


        {
          realm.password && social.providers && (
            <>
              <div className="divider">OR</div>
              <div>
                <ul>
                  {social.providers.map(p => (
                    <li key={p.providerId}>
                      <a href={p.loginUrl} id={`zocial-${p.alias}`} className={clsx("zocial", p.providerId)}>
                        <span>{p.displayName}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )
        }
      </div>
    </Template>
  )
    ;
}
