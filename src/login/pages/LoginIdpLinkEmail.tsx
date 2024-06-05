import type {KcContext} from "keycloakify/login/kcContext";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {I18n} from "keycloakify/login/i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretRight} from "@fortawesome/free-solid-svg-icons";

export default function LoginIdpLinkEmail(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-email.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, realm, brokerContext, idpAlias } = kcContext;
  const { msgStr } = i18n;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={<></>}>

      <div className="prose dark:prose-invert pb-4">
        <h1 className="text-center">
          {msgStr("emailLinkIdpTitle", idpAlias)}
        </h1>
        <p className="prose-gray px-4">{msgStr("emailLinkIdp1", idpAlias, brokerContext.username, realm.displayName)}</p>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="bg-yellow-100 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500" role="alert">
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-bold">{msgStr("emailLinkIdp2")}</span>
            <a
              className="font-medium text-yellow-500 hover:underline decoration-yellow-500 hover:opacity-80 flex items-center"
              href={url.loginAction}
            >
              {`${msgStr("doClickHere")} ${msgStr("emailLinkIdp3")}`}
              <FontAwesomeIcon icon={faCaretRight} className="ml-1"/>
            </a>
          </div>
        </div>

        <div className="bg-gray-100 border border-gray-200 text-sm text-gray-800 rounded-lg p-4 dark:bg-white/10 dark:border-white/20 dark:text-white" role="alert">
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-bold">{msgStr("emailLinkIdp4")}</span>
            <a
              className="hover:text-gray-500 font-medium hover:underline dark:text-neutral-200 dark:hover:text-neutral-400 flex items-center"
              href={url.loginAction}
            >
              {`${msgStr("doClickHere")} ${msgStr("emailLinkIdp5")}`}
              <FontAwesomeIcon icon={faCaretRight} className="ml-1"/>
            </a>
          </div>
        </div>
      </div>

    </Template>
  );
}