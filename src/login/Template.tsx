// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import {useEffect} from "react";
import {usePrepareTemplate} from "keycloakify/lib/usePrepareTemplate";
import {type TemplateProps} from "keycloakify/login/TemplateProps";
import type {KcContext} from "./kcContext";
import type {I18n} from "./i18n";
import Dropdown from "../components/Dropdown.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEarthAmericas, faLock} from '@fortawesome/free-solid-svg-icons';

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
    "htmlClassName": "min-h-full",
    "bodyClassName": "bg-white dark:bg-neutral-900 w-full flex items-center justify-center",
    "htmlLangProperty": locale?.currentLanguageTag,
    "documentTitle": msgStr("loginTitle", kcContext.realm.displayName),
  });

  useEffect(() => {
    console.log(`Value of MY_ENV_VARIABLE on the Keycloak server: "${kcContext.properties.MY_ENV_VARIABLE}"`);
  }, []);

  if (!isReady) return null;

  return (
    <div className="h-full min-h-screen max-w-lg flex flex-col justify-center mx-auto space-y-4">

      <div className="relative w-full p-5 flex flex-col space-y-4 bg-white md:border md:shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">

        {/* Locale Dropdown */}
        {realm.internationalizationEnabled && locale && locale?.supported.length > 1 && (
          <Dropdown
            defaultSelectedItem={currentLanguageTag}
            onSelect={changeLocale}
            items={locale.supported.map(({languageTag}) => languageTag)}
            itemTransformer={(languageTag) => labelBySupportedLanguageTag[languageTag]}
            buttonIconLeft={<FontAwesomeIcon icon={faEarthAmericas}/>}
            buttonClassName="btn-ghost btn-sm"
            dropdownClassName="absolute top-2 right-2"
            itemButtonClassName=""
            dropdownBodyClassName="origin-top-right absolute right-0 shadow-lg mt-2"
          />
        )}

        {/* Icon and Realm Name */}
        <div className="w-full flex flex-col items-center justify-center max-w-none py-8 space-y-4 text-gray-800 dark:text-neutral-200 prose dark:prose-invert">
          <FontAwesomeIcon icon={faLock} size={"3x"}/>
          <h1>{msgStr("loginTitleHtml", realm.displayName)}</h1>
        </div>

        {/* Required Fields notification */}
        {displayRequiredFields && (
          <div className="bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert">
            {msgStr("requiredFields")}
          </div>
        )}

        {/* Display Message TODO */}
        {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
          <div role="alert" className={
            `alert 
            ${message.type === "success" ? "bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500" : ""} 
            ${message.type === "warning" ? "bg-yellow-100 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500" : ""} 
            ${message.type === "error" ? "bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" : ""} 
            ${message.type === "info" ? "bg-gray-100 border border-gray-200 text-sm text-gray-800 rounded-lg p-4 dark:bg-white/10 dark:border-white/20 dark:text-white" : ""}
            `}>
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
