import {useRerenderOnStateChange} from "evt/hooks";
import {Markdown} from "keycloakify/tools/Markdown";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import {evtTermMarkdown} from "keycloakify/login/lib/useDownloadTerms";
import type {KcContext} from "../kcContext";
import type {I18n} from "../i18n";
import {useDownloadTerms} from "keycloakify/login";

export default function Terms(props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>) {
  const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;
  const {msg, msgStr} = i18n;

  // NOTE: If you aren't going to customize the layout of the page you can move this hook to
  // KcApp.tsx, see: https://docs.keycloakify.dev/terms-and-conditions
  useDownloadTerms({
    kcContext,
    "downloadTermMarkdown": async ({currentLanguageTag}) => {

      const tos_url = (() => {
        switch (currentLanguageTag) {
          case "fr":
            return `${import.meta.env.BASE_URL}terms/fr.md`;
          default:
            return `${import.meta.env.BASE_URL}terms/en.md`;
        }
      })();

      return await fetch(tos_url).then(response => response.text());
    }
  });

  useRerenderOnStateChange(evtTermMarkdown);

  const {url} = kcContext;

  const termMarkdown = evtTermMarkdown.state;

  if (termMarkdown === undefined) {
    return null;
  }

  return (
    <Template {...{kcContext, i18n, doUseDefaultCss, classes}} displayMessage={false} headerNode={msg("termsTitle")}>
      <div className="prose max-w-none">
        <Markdown>{termMarkdown}</Markdown>
      </div>
      <form className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4"
            action={url.loginAction} method="POST">
        <input
          className="btn btn-success btn-wide btn-lg w-full sm:w-1/2 "
          name="accept"
          id="kc-accept"
          type="submit"
          value={msgStr("doAccept")}
        />
        <input
          className="btn btn-error btn-wide btn-lg w-full sm:w-1/2 "
          name="cancel"
          id="kc-decline"
          type="submit"
          value={msgStr("doDecline")}
        />
      </form>
    </Template>
  );
}
