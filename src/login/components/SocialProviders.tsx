import { FC } from "react";
import {PageProps} from "keycloakify/login/pages/PageProps";
import {KcContext} from "../kcContext.ts";
import {I18n} from "../i18n.ts";
import {getSocialProviderConfig} from "../socialProviderConfig.ts";
import SocialLoginButton from "../../components/SocialLoginButton.tsx";

interface SocialProvidersProps extends PageProps<Extract<KcContext, { pageId:
    "login.ftl" |
    "login-username.ftl"
}>, I18n>{}

const SocialProviders: FC<SocialProvidersProps> = ({ kcContext, i18n }) => {

  const { social } = kcContext;
  const { msgStr } = i18n;

  return (
    <>
      {social.providers && (
        <div className="flex flex-col space-y-4">
          <div
            className="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">{msgStr("identity-provider-login-label")}</div>
          <ul className="flex flex-col space-y-4">
            {social.providers.map(getSocialProviderConfig).map(
              socialProviderConfig =>
                <li key={socialProviderConfig.providerId}>
                  <SocialLoginButton {...socialProviderConfig} />
                </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default SocialProviders;