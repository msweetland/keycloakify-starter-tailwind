import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "../kcContext";
import type {I18n} from "../i18n";

export default function LoginPageExpired(props: PageProps<Extract<KcContext, {
  pageId: "login-page-expired.ftl"
}>, I18n>) {
  const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;
  const {url} = kcContext;
  const {msgStr} = i18n;

  return (
    <Template {...{kcContext, i18n, doUseDefaultCss, classes}} displayMessage={false} headerNode={<></>}>
      <div className="flex flex-col space-y-4">
        <div
          className="text-center mt-2 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
          role="alert"
        >
          <span className="font-bold">{msgStr("pageExpiredTitle")}</span>
        </div>
        <a
          className="no-underline w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          href={url.loginRestartFlowUrl}>
          {msgStr("doLogIn")}
        </a>
      </div>

    </Template>
  );
}