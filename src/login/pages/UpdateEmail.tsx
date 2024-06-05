import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "../kcContext";
import type {I18n} from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

export default function UpdateEmail(props: PageProps<Extract<KcContext, { pageId: "update-email.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, messagesPerField, isAppInitiatedAction, email } = kcContext;
  const {msgStr} = i18n;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={<></>}>

      <div className="prose dark:prose-invert text-center pb-4">
        <h1>{msgStr("updateEmailTitle")}</h1>
      </div>

      <form action={url.loginAction} method="post" className="flex flex-col space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            {msgStr("email")}
          </label>
          <div className="w-full relative">
            <input
              type="email"
              id="email"
              name="email"
              className="peer py-3 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-neutral-600"
              autoFocus={true}
              autoComplete="off"
              defaultValue={email.value ?? ""}
              aria-invalid={messagesPerField.existsError("email")}
            />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
          {msgStr("doSubmit")}
        </button>

        {isAppInitiatedAction && (
          <button type="submit" name="cancel-aia" value="true" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
            {msgStr("doCancel")}
          </button>
        )}

      </form>
    </Template>
  );
}