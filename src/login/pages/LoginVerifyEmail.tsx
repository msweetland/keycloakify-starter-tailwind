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
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} displayMessage={false} headerNode={msgStr("emailVerifyTitle")}>

      <div className="flex flex-col space-y-4">

        <div className="prose dark:prose-invert px-2">
          <h3>{msgStr("emailVerifyInstruction1", user?.email ?? "")}</h3>
        </div>

        <div className="bg-yellow-100 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500" role="alert">
          <div className="flex flex-col space-y-2">
            <span className="text-sm">{msgStr("emailVerifyInstruction2")}</span>
            <a
              className="font-medium text-yellow-500 hover:underline decoration-yellow-500 hover:opacity-80 flex items-center"
              href={url.loginAction}
            >
              {`${msgStr("doClickHere")} ${msgStr("emailVerifyInstruction3")}`}
              <FontAwesomeIcon icon={faCaretRight} className="ml-1"/>
            </a>
          </div>
        </div>

      </div>
    </Template>
  );
}