import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function LoginIdpLinkConfirm(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-confirm.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, idpAlias } = kcContext;
  const { msgStr } = i18n;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={<></>}>
      <form action={url.loginAction} method="post" className="flex flex-col space-y-4">
        <div
          className="text-center bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
          role="alert"
        >
          <span className="font-bold">{msgStr("confirmLinkIdpTitle")}</span>
        </div>
        <button
          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          type="submit"
          name="submitAction"
          value="updateProfile"
        >
          {msgStr("confirmLinkIdpReviewProfile")}
        </button>
        <button
          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          type="submit"
          name="submitAction"
          value="linkAccount"
        >
          {msgStr("confirmLinkIdpContinue", idpAlias)}
        </button>
      </form>
    </Template>
  );
}