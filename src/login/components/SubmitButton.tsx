import { FC } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import {isLoginContext, isLoginPasswordContext, isLoginResetPasswordContext} from "../utils/ContextGuards.ts";

interface SubmitButtonProps extends PageProps<Extract<KcContext, { pageId:
    "login.ftl" |
    "login-reset-password.ftl" |
    "login-password.ftl"
}>, I18n> {
  isSubmitted: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = ({ kcContext, i18n, isSubmitted }) => {
  const { msgStr } = i18n;
  let message = "";

  switch (true) {
    case isLoginContext(kcContext):
      message = msgStr("doLogIn");
      break;
    case isLoginPasswordContext(kcContext):
      message = msgStr("doForgotPassword");
      break;
    case isLoginResetPasswordContext(kcContext):
      message = msgStr("doSubmit");
      break;
  }

  return (
    <button
      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
      name="login"
      type="submit"
      disabled={isSubmitted}
    >
      {!isSubmitted ? message :
        <span className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>}
    </button>
  );
};

export default SubmitButton;