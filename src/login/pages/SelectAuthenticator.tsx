import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "keycloakify/login/kcContext";
import type {I18n} from "keycloakify/login/i18n";
import {FC, HTMLProps, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretRight, faKey, faMobileScreen, faUnlock} from "@fortawesome/free-solid-svg-icons";

interface AuthIconProps extends HTMLProps<HTMLDivElement> {
  iconCssClass?: string
}

const AuthIcon: FC<AuthIconProps> = ({iconCssClass, ...props}) => {
  switch (iconCssClass) {
    case "kcAuthenticatorDefaultClass":
    case "kcAuthenticatorPasswordClass":
      return (
        <div {...props}>
          <FontAwesomeIcon icon={faUnlock} size="lg"/>
        </div>
      );
    case "kcAuthenticatorOTPClass":
      return (
        <div {...props}>
          <FontAwesomeIcon icon={faMobileScreen} size="lg"/>
        </div>
      );
    case "kcAuthenticatorWebAuthnPasswordlessClass":
    case "kcAuthenticatorWebAuthnClass":
      return (
        <div {...props}>
          <FontAwesomeIcon icon={faKey} size="lg"/>
        </div>
      );
    default:
      return (
        <div {...props}>
          <FontAwesomeIcon icon={faMobileScreen} size="lg"/>
        </div>
      );
  }
}

export default function SelectAuthenticator(props: PageProps<Extract<KcContext, { pageId: "select-authenticator.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, auth } = kcContext;
  const { msgStr } = i18n;

  const formRef = useRef<HTMLFormElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (value: string) => {
    if (!hiddenInputRef.current) return;
    hiddenInputRef.current.value = value;
    formRef.current?.submit();
  };

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={<></>}>

      <div className="prose dark:prose-invert text-center pb-4">
        <h1>{msgStr("loginChooseAuthenticator")}</h1>
      </div>

      <form
        ref={formRef}
        action={url.loginAction}
        method="post"
      >
        <input ref={hiddenInputRef} type="hidden" id="authexec-hidden-input" name="authenticationExecution"  />

        <div className="flex flex-col space-y-4">
          {auth.authenticationSelections.map((authenticationSelection, index) => (
            <button
              className="overflow-hidden cursor-pointer flex flex-row items-center justify-between space-x-2 py-3 px-4 gap-x-2 text-sm rounded-lg border border-gray-500 text-gray-500 hover:border-gray-800 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:border-neutral-300"
              key={index}
              type="button"
              onClick={() => handleButtonClick(authenticationSelection.authExecId)}
            >
              <AuthIcon iconCssClass={authenticationSelection.iconCssClass}/>
              <div className="flex flex-col space-y-2 justify-start items-start flex-grow text-left">
                <h4 className="m-0">{msgStr(authenticationSelection.displayName)}</h4>
                <p className="m-0 text-ellipsis">{msgStr(authenticationSelection.helpText)}</p>
              </div>
              <FontAwesomeIcon icon={faCaretRight} />
            </button>
          ))}
        </div>
      </form>
    </Template>
  );
}