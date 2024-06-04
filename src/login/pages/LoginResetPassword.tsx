import {type FormEventHandler, useState} from "react";
import {useConstCallback} from "keycloakify/tools/useConstCallback";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "../kcContext";
import type {I18n} from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretLeft} from "@fortawesome/free-solid-svg-icons";
import UsernameInput, {getUsernameLabel} from "../components/UsernameInput.tsx";
import SubmitButton from "../components/SubmitButton.tsx";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url} = kcContext;
  const { msgStr } = i18n;

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
    e.preventDefault();
    setIsSubmitted(true);
    (e.target as HTMLFormElement).submit();
  });

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      headerNode={<></>}
    >
      <div className="w-full max-w-md mx-auto space-y-4">

        {/* Header */}
        <div className="prose dark:prose-invert">
          <h2 className="mb-2">{msgStr("emailForgotTitle")}</h2>
          <p>{getUsernameLabel(kcContext) == "email" ? msgStr("emailInstruction") : msgStr("emailInstructionUsername")}</p>
        </div>

        {/* Password Reset */}
        <form
          className="space-y-4"
          action={url.loginAction}
          method="post"
          onSubmit={onSubmit}
        >
          <UsernameInput {...{...props, isSubmitted }}/>
          <SubmitButton {...{...props, isSubmitted }} />

        </form>

        {/* Back to Login */}
        <a className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700" href={url.loginUrl}>
          <FontAwesomeIcon icon={faCaretLeft}/>
          {msgStr("backToLogin").replace("&laquo; ", "")}
        </a>
      </div>
    </Template>
  );
}