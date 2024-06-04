import {I18n} from "../i18n";
import {KcContext} from "../kcContext";
import {PageProps} from "keycloakify/login/pages/PageProps";

export default function LoginDeviceVerifyUserCode(props: PageProps<Extract<KcContext, { pageId: "login-oauth2-device-verify-user-code.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;
  const { url } = kcContext;
  const { msgStr } = i18n;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={msgStr("oauth2DeviceVerificationTitle")}>
      <form
        action={url.oauth2DeviceVerificationAction}
        method="post"
        className="flex flex-col space-y-4"
      >
        <div>
          <label htmlFor="device-user-code" className="block text-sm font-medium mb-2 dark:text-white">{msgStr("verifyOAuth2DeviceUserCode")}</label>
          <input
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-neutral-600"
            type="text"
            id="device-user-code"
            name="device_user_code"
            aria-describedby="device-user-code"
            autoComplete="off"
            autoFocus
          />
        </div>

        <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
          {msgStr("doSubmit")}
        </button>

      </form>
    </Template>
  );
}