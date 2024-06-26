import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "../kcContext";
import type {I18n} from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretRight} from "@fortawesome/free-solid-svg-icons";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { msgStr } = i18n;
  const { url, user } = kcContext;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} displayMessage={false} headerNode={<></>}>

      <div className="prose dark:prose-invert pb-4">
        <h1 className="text-center">
          {msgStr("emailVerifyTitle")}
        </h1>
        <p className="prose-gray px-4">{msgStr("emailVerifyInstruction1", user?.email ?? "")}</p>
      </div>

      <div className="bg-yellow-100 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500" role="alert">
        <div className="flex flex-col space-y-2">
          <span className="text-sm font-bold">{msgStr("emailVerifyInstruction2")}</span>
          <a
            className="not-prose gap-x-1 text-sm decoration-2 font-medium text-yellow-500 hover:underline decoration-yellow-500 hover:opacity-80 flex items-center"
            href={url.loginAction}
          >
            {`${msgStr("doClickHere")} ${msgStr("emailVerifyInstruction3")}`}
            <FontAwesomeIcon icon={faCaretRight} className="flex-shrink-0 size-4" />
          </a>
        </div>
      </div>
    </Template>
  );
}