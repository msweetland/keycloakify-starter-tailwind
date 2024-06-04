import { ChangeEvent, useState, type FormEventHandler } from "react";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCaretLeft, faEnvelope, faUser} from "@fortawesome/free-solid-svg-icons";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, realm, auth } = kcContext;
  const { msg, msgStr } = i18n;

  const [username, setUsername] = useState(auth?.attemptedUsername || '');

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
    e.preventDefault();
    (e.target as HTMLFormElement).submit();
  });

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const getUsernameLabel = () => {
    if (!realm.loginWithEmailAllowed) {
      return "username";
    } else if (realm.registrationEmailAsUsername) {
      return "email";
    } else {
      return "usernameOrEmail";
    }
  };

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      headerNode={<></>}
    >
      <div className="w-full max-w-md mx-auto space-y-4">

        {/* Header */}
        <div className="prose">
          <h2 className="mb-2">{msgStr("emailForgotTitle")}</h2>
          <p>{getUsernameLabel() == "email" ? msgStr("emailInstruction") : msgStr("emailInstructionUsername")}</p>
        </div>

        {/* Password Reset */}
        <form
          className="space-y-4"
          action={url.loginAction}
          method="post"
          onSubmit={onSubmit}
        >
          {/* Username/Email Input */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">{msg(getUsernameLabel())}</span>
            </div>
            <label className="input input-bordered flex items-center gap-2 w-full">
              {getUsernameLabel() == "email" ? <FontAwesomeIcon icon={faEnvelope} /> : <FontAwesomeIcon icon={faUser} />}
              <input
                className="grow w-full"
                name="username"
                type="text"
                autoFocus
                autoComplete="off"
                value={username}
                onChange={handleUsernameChange}
              />
            </label>
          </label>

          {/* Submit */}
          <div className="form-control">
            <button
              className="btn btn-primary w-full"
              type="submit"
            >
              {msgStr("doSubmit")}
            </button>
          </div>

        </form>

        {/* Back to Login */}
        <div className="text-center">
          <a className="btn btn-ghost flex items-center justify-center gap-2" href={url.loginUrl}>
            <FontAwesomeIcon icon={faCaretLeft}/>
            {msgStr("backToLogin").replace("&laquo; ", "")}
          </a>
        </div>
      </div>
    </Template>
  );
}