import type {FormEventHandler} from "react";
import {useState} from "react";
import {useConstCallback} from "keycloakify/tools/useConstCallback";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "../kcContext";
import type {I18n} from "../i18n";
import UsernameInput from "../components/UsernameInput.tsx";
import SubmitButton from "../components/SubmitButton.tsx";
import RememberMeCheckbox from "../components/RememberMeCheckbox.tsx";
import SocialProviders from "../components/SocialProviders.tsx";
import RegistrationButton from "../components/RegistrationButton.tsx";

export default function LoginUsername(props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>) {
  const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;
  const {social, realm, url, usernameHidden} = kcContext;
  const {msgStr} = i18n;

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
    e.preventDefault();
    setIsSubmitted(true);
    (e.target as HTMLFormElement).submit();
  });

  return (
    <Template
      {...{kcContext, i18n, doUseDefaultCss, classes}}
      displayInfo={social.displayInfo}
      displayWide={realm.password && social.providers !== undefined}
      headerNode={<></>}
    >
      <div className="prose dark:prose-invert text-center pb-4">
        <h1>{msgStr("doLogIn")}</h1>
      </div>

      <div className="flex flex-col space-y-4">

        {realm.password && (
          <form className="flex flex-col space-y-4" onSubmit={onSubmit} action={url.loginAction} method="post">
            <UsernameInput {...{...props, isSubmitted}}/>
            {(realm.rememberMe && !usernameHidden) && (
              <RememberMeCheckbox {...{...props, isSubmitted}} />
            )}
            <SubmitButton {...{...props, isSubmitted}}/>
          </form>
        )}

        <SocialProviders {...props} />
        <RegistrationButton {...props} />

      </div>
    </Template>
  );
}