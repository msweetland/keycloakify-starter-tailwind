import { FC } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import {
  isLoginContext, isLoginOtpContext,
  isLoginPasswordContext,
  isLoginResetPasswordContext, isLoginUpdatePasswordContext, isUpdateUserProfileContext,
  isLoginUsernameContext, isLoginUpdateProfileContext
} from "../utils/ContextGuards";

interface SubmitButtonProps extends PageProps<Extract<KcContext, { pageId:
    "login.ftl" |
    "login-reset-password.ftl" |
    "login-password.ftl" |
    "login-username.ftl" |
    "login-otp.ftl" |
    "login-update-password.ftl" |
    "login-update-profile.ftl" |
    "update-user-profile.ftl"
}>, I18n> {
  isSubmitted: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = ({ kcContext, i18n, isSubmitted }) => {
  const { msgStr } = i18n;
  let message = "";

  switch (true) {
    case isLoginContext(kcContext):
    case isLoginUsernameContext(kcContext):
    case isLoginPasswordContext(kcContext):
    case isLoginOtpContext(kcContext):
      message = msgStr("doLogIn");
      break;
    case isLoginResetPasswordContext(kcContext):
    case isLoginUpdatePasswordContext(kcContext):
    case isUpdateUserProfileContext(kcContext):
    case isLoginUpdateProfileContext(kcContext):
      message = msgStr("doSubmit");
      break;
  }

  return (
    <button
      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
      type="submit"
      disabled={isSubmitted}
    >
      {!isSubmitted ? message :
        <span className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>}
    </button>
  );
};

export default SubmitButton;