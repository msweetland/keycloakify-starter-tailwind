import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretLeft} from "@fortawesome/free-solid-svg-icons";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "../kcContext";
import type {I18n} from "../i18n";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
  const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;
  const {client} = kcContext;
  const {msgStr} = i18n;

  return (
    <Template
      {...{kcContext, i18n, doUseDefaultCss, classes}}
      headerNode={<></>}
    >
      <>

        {/* Error Handled in Template */}

        {/* Back to Application */}
        {client && client.baseUrl && (
          <a
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
            href={client.baseUrl}
          >
            <FontAwesomeIcon icon={faCaretLeft}/>
            {msgStr("backToApplication").replace("&laquo; ", "")}
          </a>
        )}
      </>
    </Template>
  );
}
