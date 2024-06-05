import {FC} from "react";
import {PageProps} from "keycloakify/login/pages/PageProps";
import {KcContext} from "../kcContext.ts";
import {I18n} from "../i18n.ts";

interface RegistrationButtonProps extends PageProps<Extract<KcContext, { pageId:
    "login.ftl" |
    "login-username.ftl"
}>, I18n>{}

const RegistrationButton: FC<RegistrationButtonProps> = ({ kcContext, i18n }) => {

  const { realm, url, registrationDisabled } = kcContext;
  const { msgStr } = i18n;

  return (
    <>
      {realm.password && realm.registrationAllowed && !registrationDisabled && (
        <div className="flex flex-col space-y-4">
          <div
            className="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">{msgStr("noAccount")}</div>
          <a
            className="w-full justify-center py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:hover:text-white"
            href={url.registrationUrl}> {msgStr("doRegister")}</a>
        </div>
      )}
    </>
  );
};

export default RegistrationButton;