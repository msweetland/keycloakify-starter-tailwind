import "./KcApp.css";
import {lazy, Suspense} from "react";
import Fallback from "keycloakify/login";
import type {KcContext} from "./kcContext";
import {useI18n} from "./i18n";
import Template from "./Template";
import {HSStaticMethods} from "preline";

HSStaticMethods.autoInit();

const Login = lazy(() => import("./pages/Login"));
const LoginUsername = lazy(() => import("./pages/LoginUsername"));
const LoginPassword = lazy(() => import("./pages/LoginPassword"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"));
const LoginUpdateProfile = lazy(() => import("./pages/LoginUpdateProfile"));
const LoginPageExpired = lazy(() => import("./pages/LoginPageExpired"));
const LoginIdpLinkConfirm = lazy(() => import("./pages/LoginIdpLinkConfirm"));
const LoginIdpLinkEmail = lazy(() => import("./pages/LoginIdpLinkEmail"));
const LoginVerifyEmail = lazy(() => import("./pages/LoginVerifyEmail"));
const LoginDeviceVerifyUserCode = lazy(() => import("./pages/LoginDeviceVerifyUserCode"));
const LoginOtp = lazy(() => import("./pages/LoginOtp"));
const LogoutConfirm = lazy(() => import("./pages/LogoutConfirm"));
const LoginOauthGrant = lazy(() => import("./pages/LoginOauthGrant"));
const LoginConfigTotp = lazy(() => import("./pages/LoginConfigTotp"));
const Error = lazy(() => import("./pages/Error"));
const Info = lazy(() => import("./pages/Info"));
const SamlPostForm = lazy(() => import("./pages/SamlPostForm"));
const SelectAuthenticator = lazy(() => import("./pages/SelectAuthenticator"));
const UpdateEmail = lazy(() => import("./pages/UpdateEmail"));
const UpdateUserProfile = lazy(() => import("./pages/UpdateUserProfile"));
const WebauthnAuthenticate = lazy(() => import("./pages/WebauthnAuthenticate"));
// If you can, favor register-user-profile.ftl over register.ftl, see: https://docs.keycloakify.dev/realtime-input-validation
const Register = lazy(() => import("./pages/Register"));
const RegisterUserProfile = lazy(() => import("./pages/RegisterUserProfile"));
const Terms = lazy(() => import("./pages/Terms"));
const MyExtraPage1 = lazy(() => import("./pages/MyExtraPage1"));
const MyExtraPage2 = lazy(() => import("./pages/MyExtraPage2"));

export default function KcApp(props: { kcContext: KcContext; }) {

  const {kcContext} = props;
  const i18n = useI18n({kcContext});
  if (i18n === null) return null;

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case "error.ftl":
            return <Error {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "info.ftl":
            return <Info {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "login.ftl":
            return <Login {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "login-username.ftl":
            return <LoginUsername {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "login-password.ftl":
            return <LoginPassword {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "login-reset-password.ftl":
            return <LoginResetPassword {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "login-update-password.ftl":
            return <LoginUpdatePassword {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "login-update-profile.ftl":
            return <LoginUpdateProfile {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "login-page-expired.ftl":
            return <LoginPageExpired {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "login-idp-link-confirm.ftl":
            return <LoginIdpLinkConfirm {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "login-idp-link-email.ftl":
            return <LoginIdpLinkEmail {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "login-verify-email.ftl":
            return <LoginVerifyEmail {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "login-oauth2-device-verify-user-code.ftl":
            return <LoginDeviceVerifyUserCode {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "login-otp.ftl":
            return <LoginOtp {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "logout-confirm.ftl":
            return <LogoutConfirm {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "login-oauth-grant.ftl":
            return <LoginOauthGrant {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "login-config-totp.ftl":
            return <LoginConfigTotp {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "saml-post-form.ftl":
            return <SamlPostForm {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "register.ftl":
            return <Register {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "register-user-profile.ftl":
            return <RegisterUserProfile {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "select-authenticator.ftl":
            return <SelectAuthenticator {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "update-email.ftl":
            return <UpdateEmail {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "update-user-profile.ftl":
            return <UpdateUserProfile {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "webauthn-authenticate.ftl":
            return <WebauthnAuthenticate {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "terms.ftl":
            return <Terms {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          // Removes those pages in you project. They are included to show you how to implement keycloak pages
          // that are not yes implemented by Keycloakify.
          // See: https://docs.keycloakify.dev/limitations#some-pages-still-have-the-default-theme.-why
          case "my-extra-page-1.ftl":
            return <MyExtraPage1 {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "my-extra-page-2.ftl":
            return <MyExtraPage2 {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          default:
            return <Fallback {...{kcContext, i18n}} Template={Template} doUseDefaultCss={false}/>;
        }
      })()}
    </Suspense>
  );

}
