import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "../kcContext";
import type {I18n} from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretLeft} from "@fortawesome/free-solid-svg-icons";

export default function LogoutConfirm(props: PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, client, logoutConfirm } = kcContext;
  const { msgStr } = i18n;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} displayMessage={false} headerNode={msgStr("logoutConfirmTitle")}>

      <div className="prose dark:prose-invert text-center">
        <h1>{msgStr("logoutConfirmTitle")}</h1>
        <p className="prose-gray">{msgStr("logoutConfirmHeader")}</p>
      </div>

      <form className="flex flex-col space-y-4" action={url.logoutConfirmAction} method="POST">

        <input type="hidden" name="session_code" value={logoutConfirm.code} />

        <input
          className="cursor-pointer w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          name="confirmLogout"
          id="kc-logout"
          type="submit"
          value={msgStr("doLogout")}
        />

        {!logoutConfirm.skipLink && client.baseUrl && (
          <a className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700" href={client.baseUrl}>
            <FontAwesomeIcon icon={faCaretLeft}/>
            {msgStr("backToApplication").replace("&laquo; ", "")}
          </a>
        )}

      </form>
    </Template>
  );
}