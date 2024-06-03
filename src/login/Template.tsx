// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import {useEffect} from "react";
import {usePrepareTemplate} from "keycloakify/lib/usePrepareTemplate";
import {type TemplateProps} from "keycloakify/login/TemplateProps";
import type {KcContext} from "./kcContext";
import type {I18n} from "./i18n";
import Dropdown from "../components/Dropdown.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEarthAmericas, faExclamation, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayMessage = true,
    displayRequiredFields,
    kcContext,
    i18n,
    children
  } = props;

  const {msgStr, changeLocale, labelBySupportedLanguageTag, currentLanguageTag} = i18n;
  const {realm, locale, message, isAppInitiatedAction} = kcContext;

  const {isReady} = usePrepareTemplate({
    "doFetchDefaultThemeResources": false,
    "styles": [],
    "htmlClassName": undefined,
    "bodyClassName": "bg-base-100 w-full min-h-screen w-full flex items-center justify-center",
    "htmlLangProperty": locale?.currentLanguageTag,
    "documentTitle": msgStr("loginTitle", kcContext.realm.displayName),
  });

  useEffect(() => {
    console.log(`Value of MY_ENV_VARIABLE on the Keycloak server: "${kcContext.properties.MY_ENV_VARIABLE}"`);
  }, []);

  if (!isReady) return null;

  return (
    <div className="card bg-neutral text-neutral-content w-full max-w-lg mx-auto my-5 sm:my-10 md:my-20 relative">

      {/* Locale Dropdown */}
      {realm.internationalizationEnabled && locale && locale?.supported.length > 1 && (
        <Dropdown
          defaultSelectedItem={currentLanguageTag}
          onSelect={changeLocale}
          items={locale.supported.map(({languageTag}) => languageTag)}
          itemTransformer={(languageTag) => labelBySupportedLanguageTag[languageTag]}
          buttonIconLeft={<FontAwesomeIcon icon={faEarthAmericas}/>}
          buttonClassName="btn-ghost btn-sm"
          dropdownClassName="absolute top-1 right-1 dropdown-bottom dropdown-end"
          itemButtonClassName="btn-sm"
          dropdownBodyClassName="shadow-lg"
        />
      )}

      <div className="card-body w-full flex flex-col space-y-8">

        {/* Realm Name and Icon */}
        <div className="w-full flex flex-col items-center justify-center prose max-w-none">
          <img className="mb-4" src={`${import.meta.env.BASE_URL}keycloakify-logo.png`} alt="Keycloakify logo" width={50}/>
          <h1>{msgStr("loginTitleHtml", realm.displayName)}</h1>
        </div>


        {/* Required Fields notification */}
        {displayRequiredFields && (
          <div role="alert" className="alert alert-error">
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <span>{msgStr("requiredFields")}</span>
          </div>
        )}

        {/* Restart Login TODO */}
        {/*<div id="kc-username">*/}
        {/*  <label id="kc-attempted-username">{auth?.attemptedUsername}</label>*/}
        {/*  <a id="reset-login" href={url.loginRestartFlowUrl}>*/}
        {/*    <div className="kc-login-tooltip">*/}
        {/*      <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>*/}
        {/*    </div>*/}
        {/*  </a>*/}
        {/*</div>*/}

        {/* Display Message TODO */}
        {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
          <div role="alert" className={
            `alert 
            ${message.type === "success" ? "alert-success" : ""} 
            ${message.type === "warning" ? "alert-warning" : ""} 
            ${message.type === "error" ? "alert-error" : ""} 
            ${message.type === "info" ? "alert-info" : ""}
            `}>
            <FontAwesomeIcon icon={faExclamation} />
            <span>{message.summary}</span>
          </div>
        )}

        {/* Specific Page */}
        {children}

        {/* Try Another Way TODO */}
        {/*{auth?.showTryAnotherWayLink && showAnotherWayIfPresent && (*/}
        {/*  <form*/}
        {/*    id="kc-select-try-another-way-form"*/}
        {/*    action={url.loginAction}*/}
        {/*    method="post"*/}
        {/*    // className={clsx(displayWide && getClassName("kcContentWrapperClass"))}*/}
        {/*  >*/}
        {/*    <div*/}
        {/*      // className={clsx(*/}
        {/*      //   displayWide && [getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")]*/}
        {/*      // )}*/}
        {/*    >*/}
        {/*      <div*/}
        {/*        // className={getClassName("kcFormGroupClass")}*/}
        {/*      >*/}
        {/*        <input type="hidden" name="tryAnotherWay" value="on"/>*/}
        {/*        <a*/}
        {/*          href="#"*/}
        {/*          id="try-another-way"*/}
        {/*          onClick={() => {*/}
        {/*            document.forms["kc-select-try-another-way-form" as never].submit();*/}
        {/*            return false;*/}
        {/*          }}*/}
        {/*        >*/}
        {/*          {msg("doTryAnotherWay")}*/}
        {/*        </a>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </form>*/}
        {/*)}*/}

      </div>
    </div>
  );
}
