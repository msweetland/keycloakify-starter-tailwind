// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import {ChangeEvent, useEffect, useState} from "react";
import {usePrepareTemplate} from "keycloakify/lib/usePrepareTemplate";
import {type TemplateProps} from "keycloakify/login/TemplateProps";
import type {KcContext} from "./kcContext";
import type {I18n} from "./i18n";

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    // displayRequiredFields = false,
    showAnotherWayIfPresent = true,
    // showUsernameNode = null,
    kcContext,
    i18n,
    doUseDefaultCss,
    children
  } = props;

  const {msg, msgStr, changeLocale, labelBySupportedLanguageTag, currentLanguageTag} = i18n;
  const {realm, locale, auth, url, message, isAppInitiatedAction} = kcContext;

  const [selectedLocale, setSelectedLocale] = useState<string>(currentLanguageTag);

  const {isReady} = usePrepareTemplate({
    "doFetchDefaultThemeResources": doUseDefaultCss,
    "styles": [],
    "htmlClassName": undefined,
    "bodyClassName": "bg-base-100 flex items-center justify-center min-h-screen",
    "htmlLangProperty": locale?.currentLanguageTag,
    "documentTitle": msgStr("loginTitle", kcContext.realm.displayName)
  });

  useEffect(() => {
    console.log(`Value of MY_ENV_VARIABLE on the Keycloak server: "${kcContext.properties.MY_ENV_VARIABLE}"`);
  }, []);

  if (!isReady) return null;

  const handleLocaleSelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    setSelectedLocale(newLocale);
    changeLocale(newLocale)
  };

  return (
    <div className="card bg-neutral text-neutral-content w-full max-w-lg mx-auto my-5 sm:my-10 md:my-20">



      {/*select select-ghost select-sm bg-transparent outline-none border-none focus:outline-none focus:border-none*/}

      <div className="card-body w-full flex flex-col space-y-8 relative">

        <div className="w-full flex flex-col items-center justify-center prose max-w-none">
          <img src={`${import.meta.env.BASE_URL}keycloakify-logo.png`} alt="Keycloakify logo" width={50}
               className="mb-4"/>
          <h1>{msgStr("loginTitleHtml", realm.displayName)}</h1>
        </div>

        {realm.internationalizationEnabled && locale && locale?.supported.length > 1 && (
          <div className="absolute top-0 right-8">
            <select className="btn btn-sm btn-ghost px-0" value={selectedLocale} onChange={handleLocaleSelectionChange}>
              {locale.supported.map(({languageTag}) => (
                <option value={languageTag} key={languageTag}>{labelBySupportedLanguageTag[languageTag]}</option>
              ))}
            </select>
          </div>
        )}







        {/*{!(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (*/}
        {/*  displayRequiredFields ? (*/}
        {/*    <div className={getClassName("kcContentWrapperClass")}>*/}
        {/*      <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>*/}
        {/*                  <span className="subtitle">*/}
        {/*                      <span className="required">*</span>*/}
        {/*                    {msg("requiredFields")}*/}
        {/*                  </span>*/}
        {/*      </div>*/}
        {/*      <div className="col-md-10">*/}
        {/*        <h1 id="kc-page-title">{headerNode}</h1>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  ) : (*/}
        {/*    <h1 id="kc-page-title">{headerNode}</h1>*/}
        {/*  )*/}
        {/*) : displayRequiredFields ? (*/}
        {/*  <div className={getClassName("kcContentWrapperClass")}>*/}
        {/*    <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>*/}
        {/*              <span className="subtitle">*/}
        {/*                  <span className="required">*</span> {msg("requiredFields")}*/}
        {/*              </span>*/}
        {/*    </div>*/}
        {/*    <div className="col-md-10">*/}
        {/*      {showUsernameNode}*/}
        {/*      <div className={getClassName("kcFormGroupClass")}>*/}
        {/*        <div id="kc-username">*/}
        {/*          <label id="kc-attempted-username">{auth?.attemptedUsername}</label>*/}
        {/*          <a id="reset-login" href={url.loginRestartFlowUrl}>*/}
        {/*            <div className="kc-login-tooltip">*/}
        {/*              <i className={getClassName("kcResetFlowIcon")}></i>*/}
        {/*              <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>*/}
        {/*            </div>*/}
        {/*          </a>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*) : (*/}
        {/*  <>*/}
        {/*    {showUsernameNode}*/}
        {/*    <div className={getClassName("kcFormGroupClass")}>*/}
        {/*      <div id="kc-username">*/}
        {/*        <label id="kc-attempted-username">{auth?.attemptedUsername}</label>*/}
        {/*        <a id="reset-login" href={url.loginRestartFlowUrl}>*/}
        {/*          <div className="kc-login-tooltip">*/}
        {/*            <i className={getClassName("kcResetFlowIcon")}></i>*/}
        {/*            <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>*/}
        {/*          </div>*/}
        {/*        </a>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </>*/}
        {/*)}*/}

        {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
        {/*{displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (*/}
        {/*  <div className={clsx("alert", `alert-${message.type}`)}>*/}
        {/*    {message.type === "success" && <span className={getClassName("kcFeedbackSuccessIcon")}></span>}*/}
        {/*    {message.type === "warning" && <span className={getClassName("kcFeedbackWarningIcon")}></span>}*/}
        {/*    {message.type === "error" && <span className={getClassName("kcFeedbackErrorIcon")}></span>}*/}
        {/*    {message.type === "info" && <span className={getClassName("kcFeedbackInfoIcon")}></span>}*/}
        {/*    <span*/}
        {/*      className="kc-feedback-text"*/}
        {/*      dangerouslySetInnerHTML={{*/}
        {/*        "__html": message.summary*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*)}*/}


        {children}

        {auth?.showTryAnotherWayLink && showAnotherWayIfPresent && (
          <form
            id="kc-select-try-another-way-form"
            action={url.loginAction}
            method="post"
            // className={clsx(displayWide && getClassName("kcContentWrapperClass"))}
          >
            <div
              // className={clsx(
              //   displayWide && [getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")]
              // )}
            >
              <div
                // className={getClassName("kcFormGroupClass")}
              >
                <input type="hidden" name="tryAnotherWay" value="on"/>
                <a
                  href="#"
                  id="try-another-way"
                  onClick={() => {
                    document.forms["kc-select-try-another-way-form" as never].submit();
                    return false;
                  }}
                >
                  {msg("doTryAnotherWay")}
                </a>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
