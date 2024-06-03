import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretLeft} from "@fortawesome/free-solid-svg-icons";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "../kcContext";
import type {I18n} from "../i18n";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { client } = kcContext;
  const { msgStr } = i18n;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      headerNode={<></>}
    >
      <div className="w-full max-w-md mx-auto">

        {/* Error Handled in Template */}

        {/* Back to Application */}
        {client && client.baseUrl && (
          <div className="text-center">
            <a className="btn btn-ghost flex items-center justify-center gap-2" href={client.baseUrl}>
              <FontAwesomeIcon icon={faCaretLeft} />
              {msgStr("backToApplication").replace("&laquo; ", "")}
            </a>
          </div>
        )}
      </div>
    </Template>
  );
}
