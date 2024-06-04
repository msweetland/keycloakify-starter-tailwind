import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import {isLoginContext, isLoginPasswordContext} from "../utils/ContextGuards.ts";

interface PasswordInputProps extends PageProps<Extract<KcContext, { pageId:
    "login.ftl" |
    "login-reset-password.ftl" |
    "login-password.ftl"
}>, I18n> {
  isSubmitted: boolean;
}

const PasswordInput: FC<PasswordInputProps> = ({
                                                 kcContext,
                                                 i18n,
                                                 isSubmitted,
                                               }) => {
  const { msg, msgStr } = i18n;
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div>
      <div className="flex justify-between items-center">
        <label htmlFor="password" className="block text-sm font-medium mb-2 dark:text-white">
          {msg("password")}
        </label>
        {(isLoginContext(kcContext) || isLoginPasswordContext(kcContext)) && kcContext.realm.resetPasswordAllowed && (
          <a
            className="text-sm font-medium mb-2 text-blue-600 decoration-blue-600 hover:underline hover:opacity-80"
            href={kcContext.url.loginResetCredentialsUrl}
          >
            {msgStr("doForgotPassword")}
          </a>
        )}
      </div>
      <div className="w-full relative">
        <input
          className="peer py-3 px-4 ps-11 pe-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-neutral-600"
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="off"
          disabled={isSubmitted}
        />
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
          <FontAwesomeIcon icon={faKey} className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500" />
        </div>
        <button
          className="absolute inset-y-0 end-0 flex items-center pe-4 cursor-pointer"
          onClick={toggleShowPassword}
          disabled={isSubmitted}
          type="button"
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500" />
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;