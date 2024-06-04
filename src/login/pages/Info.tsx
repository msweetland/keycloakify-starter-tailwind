import { assert } from "keycloakify/tools/assert";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretLeft} from "@fortawesome/free-solid-svg-icons";

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { msgStr } = i18n;

  assert(
    kcContext.message !== undefined,
    "No message in kcContext.message, there will always be a message in production context, add it in your mock"
  );

  const { messageHeader, message, skipLink, pageRedirectUri, actionUri, client } = kcContext;

  let linkData = undefined;

  if (!skipLink && pageRedirectUri !== undefined) {
    linkData = {
      href: pageRedirectUri,
      message: msgStr("backToApplication").replace("&laquo;", ""),
      leftIcon: <FontAwesomeIcon icon={faCaretLeft} className="mr-1" />
    };
  }

  if (actionUri !== undefined) {
    linkData = {
      href: actionUri,
      message: msgStr("proceedWithAction").replace("&raquo;", ""),
    };
  }

  if (client.baseUrl !== undefined) {
    linkData = {
      href: client.baseUrl,
      message: msgStr("backToApplication").replace("&laquo;", ""),
      leftIcon: <FontAwesomeIcon icon={faCaretLeft} className="mr-1" />
    };
  }


  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={false}
      headerNode={<></>}
    >
      <div className="bg-blue-100 border border-blue-200 text-gray-800 rounded-lg p-4 dark:bg-blue-800/10 dark:border-blue-900 dark:text-white" role="alert">
        <div className="flex flex-col space-y-4">
          {messageHeader && <h3 className="font-semibold">{messageHeader}</h3>}
          <p>{message.summary}</p>

          {/* TODO */}
          {/*{requiredActions !== undefined && (*/}
          {/*  <b>{requiredActions.map(requiredAction => msgStr(`requiredAction.${requiredAction}` as const)).join(",")}</b>*/}
          {/*)}*/}

          {linkData && (
            <a
              className="hover:underline inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
              href={linkData.href}
            >
              {linkData.leftIcon || <></>}
              {linkData.message}
            </a>
          )}
        </div>
      </div>
    </Template>
  );
}