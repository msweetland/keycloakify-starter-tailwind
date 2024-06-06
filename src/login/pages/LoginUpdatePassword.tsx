import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "../kcContext";
import type {I18n} from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faKey} from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../components/SubmitButton";
import {useState} from "react";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { msg, msgStr } = i18n;
  const { url, isAppInitiatedAction, username } = kcContext;

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={<></>}>

      <div className="prose dark:prose-invert text-center pb-4">
        <h1>{msgStr("updatePasswordTitle")}</h1>
      </div>

      <form className="flex flex-col space-y-4" action={url.loginAction} method="post">

        <input hidden={true} type="password" id="password" name="password" autoComplete="current-password" />
        <input hidden={true} type="text" id="username" name="username" value={username} readOnly={true} autoComplete="username"/>

        <div>
          <div className="flex justify-between items-center">
            <label htmlFor="password-new" className="block text-sm font-medium mb-2 dark:text-white">
              {msg("passwordNew")}
            </label>
          </div>
          <div className="w-full relative">
            <input
              className="peer py-3 px-4 ps-11 pe-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-neutral-600"
              type={showPassword ? "text" : "password"}
              id="password-new"
              name="password-new"
              autoFocus
              autoComplete="new-password"
            />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
              <FontAwesomeIcon icon={faKey} className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500" />
            </div>
            <button
              className="absolute inset-y-0 end-0 flex items-center pe-4 cursor-pointer"
              onClick={toggleShowPassword}
              type="button"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500" />
            </button>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <label htmlFor="password-confirm" className="block text-sm font-medium mb-2 dark:text-white">
              {msg("passwordConfirm")}
            </label>
          </div>
          <div className="w-full relative">
            <input
              className="peer py-3 px-4 ps-11 pe-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-neutral-600"
              type={showPassword ? "text" : "password"}
              id="password-confirm"
              name="password-confirm"
              autoComplete="new-password"
            />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
              <FontAwesomeIcon icon={faKey} className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500" />
            </div>
            <button
              className="absolute inset-y-0 end-0 flex items-center pe-4 cursor-pointer"
              onClick={toggleShowPassword}
              type="button"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500" />
            </button>
          </div>
        </div>

        <div>
          {isAppInitiatedAction && (
            <div className="checkbox">
              <label>
                <input type="checkbox" id="logout-sessions" name="logout-sessions" value="on" checked />
                {msgStr("logoutOtherSessions")}
              </label>
            </div>
          )}
        </div>

        <SubmitButton {...{...props, isSubmitted: false}}/>

        {isAppInitiatedAction && (
          <button type="submit" name="cancel-aia" value="true" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
            {msgStr("doCancel")}
          </button>
        )}

      </form>
    </Template>
  );
}