import {KcContext} from "../kcContext";
import {I18n} from "../i18n";
import {PageProps} from "keycloakify/login/pages/PageProps";

export default function LoginOauthGrant(props: PageProps<Extract<KcContext, {
  pageId: "login-oauth-grant.ftl"
}>, I18n>) {
  const {kcContext, i18n, doUseDefaultCss, classes, Template} = props;
  const {url, oauth, client} = kcContext;

  const {msgStr, advancedMsg, advancedMsgStr} = i18n;

  return (
    <Template
      {...{kcContext, i18n, doUseDefaultCss, classes}}
      headerNode={<></>}
    >
      <form action={url.oauthAction} method="POST" className="flex flex-col space-y-4 prose dark:prose-invert">
        <h2
          className="text-center">{msgStr("oauthGrantTitle", client.name ? advancedMsgStr(client.name) : client.clientId)}</h2>
        <div
          className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 flex flex-col"
          role="alert">
          <h3 className="mt-1">{msgStr("oauthGrantRequest")}</h3>
          <ul className="mb-1">
            {oauth.clientScopesRequested.map(clientScope => (
              <li key={clientScope.consentScreenText}>
                {advancedMsg(clientScope.consentScreenText)}
              </li>
            ))}
          </ul>
        </div>

        <input type="hidden" name="code" value={oauth.code}/>

        <input
          className="w-full cursor-pointer py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          name="accept"
          id="kc-login"
          type="submit"
          value={msgStr("doYes")}
        />

        <input
          className="w-full cursor-pointer py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          name="cancel"
          id="kc-cancel"
          type="submit"
          value={msgStr("doNo")}
        />
      </form>

    </Template>
  );
}