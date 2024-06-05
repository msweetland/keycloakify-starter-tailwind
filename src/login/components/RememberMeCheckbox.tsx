import { FC } from "react";
import {PageProps} from "keycloakify/login/pages/PageProps";
import {KcContext} from "../kcContext.ts";
import {I18n} from "../i18n.ts";

interface RememberMeCheckboxProps extends PageProps<Extract<KcContext, { pageId:
    "login.ftl" |
    "login-username.ftl"
}>, I18n> {
  isSubmitted: boolean;
}

const RememberMeCheckbox: FC<RememberMeCheckboxProps> = ({ isSubmitted, i18n }) => {

  const { msgStr } = i18n;

  return (
    <div className="flex">
      <input
        type="checkbox"
        className="shrink-0 mt-0.5 border border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
        id="rememberMe"
        name="rememberMe"
        disabled={isSubmitted}
      />
      <label htmlFor="rememberMe" className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
        {msgStr("rememberMe")}
      </label>
    </div>
  );
};

export default RememberMeCheckbox;