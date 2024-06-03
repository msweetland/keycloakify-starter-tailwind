import { ChangeEvent, useState, type FormEventHandler } from "react";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

export default function LoginPassword(props: PageProps<Extract<KcContext, { pageId: "login-password.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { realm, url, login } = kcContext;
  const { msgStr } = i18n;

  const [password, setPassword] = useState(login.password || '');
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
    e.preventDefault();
    setIsLoginButtonDisabled(true);
    const formElement = e.target as HTMLFormElement;
    formElement.submit();
  });

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      headerNode={<></>}
    >
      <div className="w-full max-w-md mx-auto space-y-4">

        {/* Password Login */}
        <form
          className="space-y-4"
          action={url.loginAction}
          method="post"
          onSubmit={onSubmit}
        >
          {/* Password Input */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">{msgStr("password")}</span>
            </div>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <FontAwesomeIcon icon={faKey} />
              <input
                className="grow w-full"
                name="password"
                type="password"
                autoFocus
                autoComplete="on"
                value={password}
                onChange={handlePasswordChange}
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

          {/* Submit */}
          <div className="form-control">
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isLoginButtonDisabled}
            >
              {msgStr("doLogIn")}
            </button>
          </div>
        </form>

      </div>
    </Template>
  );
}