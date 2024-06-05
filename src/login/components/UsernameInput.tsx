import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import {isLoginContext, isLoginResetPasswordContext} from "../utils/ContextGuards.ts";

type KcContextSupportedPages = Extract<KcContext, { pageId:
  "login.ftl" |
  "login-username.ftl" |
  "login-reset-password.ftl" }>

interface UsernameInputProps extends PageProps<KcContextSupportedPages, I18n> {
  isSubmitted: boolean;
}

export function getUsernameLabel ({realm}: KcContextSupportedPages) {
  if (!realm.loginWithEmailAllowed) {
    return "username";
  } else if (realm.registrationEmailAsUsername) {
    return "email";
  } else {
    return "usernameOrEmail";
  }
}

const UsernameInput: FC<UsernameInputProps> = ({
                                                 kcContext,
                                                 i18n,
                                                 isSubmitted,
                                               }) => {
  const { realm } = kcContext;
  const { msg } = i18n;

  const getUsernameLabel = () => {
    if (!realm.loginWithEmailAllowed) {
      return "username";
    } else if (realm.registrationEmailAsUsername) {
      return "email";
    } else {
      return "usernameOrEmail";
    }
  };

  let defaultValue = "";
  if (isLoginContext(kcContext)) {
    defaultValue = kcContext.login.username || "";
  } else if (isLoginResetPasswordContext(kcContext)) {
    defaultValue = kcContext.auth?.attemptedUsername || "";
  }

  return (
    <div>

      {/* Restart Login TODO */}
      {/*<div id="kc-username">*/}
      {/*  <label id="kc-attempted-username">{auth?.attemptedUsername}</label>*/}
      {/*  <a id="reset-login" href={url.loginRestartFlowUrl}>*/}
      {/*    <div className="kc-login-tooltip">*/}
      {/*      <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>*/}
      {/*    </div>*/}
      {/*  </a>*/}
      {/*</div>*/}

      <label
        htmlFor="username"
        className="block text-sm font-medium mb-2 dark:text-white"
      >
        {msg(getUsernameLabel())}
      </label>
      <div className="w-full relative">
        <input
          type={getUsernameLabel() === "email" ? "email" : "text"}
          id="username"
          name="username"
          className="peer py-3 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-neutral-600"
          defaultValue={defaultValue}
          autoFocus={true}
          autoComplete="off"
          disabled={isSubmitted}
        />
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
          {getUsernameLabel() === "email" ? (
            <FontAwesomeIcon
              icon={faEnvelope}
              className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500"
            />
          ) : (
            <FontAwesomeIcon
              icon={faUser}
              className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UsernameInput;