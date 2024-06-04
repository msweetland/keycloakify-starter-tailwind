import "./KcApp.css";
import {lazy, Suspense} from "react";
import Fallback from "keycloakify/login";
import type {KcContext} from "./kcContext";
import {useI18n} from "./i18n";
import Template from "./Template";
import LoginResetPassword from "./pages/LoginResetPassword.tsx";
import LoginPassword from "./pages/LoginPassword.tsx";
import Error from "./pages/Error.tsx";

import { HSStaticMethods } from "preline";

HSStaticMethods.autoInit();

const Login = lazy(() => import("./pages/Login"));
// If you can, favor register-user-profile.ftl over register.ftl, see: https://docs.keycloakify.dev/realtime-input-validation
const Register = lazy(() => import("./pages/Register"));
const RegisterUserProfile = lazy(() => import("./pages/RegisterUserProfile"));
const Terms = lazy(() => import("./pages/Terms"));
const MyExtraPage1 = lazy(() => import("./pages/MyExtraPage1"));
const MyExtraPage2 = lazy(() => import("./pages/MyExtraPage2"));
const Info = lazy(() => import("keycloakify/login/pages/Info"));

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
          case "login.ftl":
            return <Login {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "login-password.ftl":
            return <LoginPassword {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>
          case "login-reset-password.ftl":
            return <LoginResetPassword {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>

          case "register.ftl":
            return <Register {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "register-user-profile.ftl":
            return <RegisterUserProfile {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>
          case "terms.ftl":
            return <Terms {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          // Removes those pages in you project. They are included to show you how to implement keycloak pages
          // that are not yes implemented by Keycloakify.
          // See: https://docs.keycloakify.dev/limitations#some-pages-still-have-the-default-theme.-why
          case "my-extra-page-1.ftl":
            return <MyExtraPage1 {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          case "my-extra-page-2.ftl":
            return <MyExtraPage2 {...{kcContext, i18n, Template}} doUseDefaultCss={false}/>;
          // We choose to use the default Template for the Info page and to download the theme resources.
          // This is just an example to show you what is possible. You likely don't want to keep this as is.
          case "info.ftl":
            return (
              <Info
                {...{kcContext, i18n}}
                Template={lazy(() => import("keycloakify/login/Template"))}
                doUseDefaultCss={false}
              />
            );
          default:
            return <Fallback {...{kcContext, i18n}} Template={Template} doUseDefaultCss={false}/>;
        }
      })()}
    </Suspense>
  );

}
