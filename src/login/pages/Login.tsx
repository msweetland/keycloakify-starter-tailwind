import {type FormEventHandler, useState} from "react";
import {useConstCallback} from "keycloakify/tools/useConstCallback";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "../kcContext";
import type {I18n} from "../i18n";
import UsernameInput from "../components/UsernameInput.tsx";
import PasswordInput from "../components/PasswordInput.tsx";
import SubmitButton from "../components/SubmitButton.tsx";
import RememberMeCheckbox from "../components/RememberMeCheckbox.tsx";
import SocialProviders from "../components/SocialProviders.tsx";
import RegistrationButton from "../components/RegistrationButton.tsx";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
  const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;
  const {realm, url, usernameHidden, auth} = kcContext;
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
      headerNode={<></>}
    >

      <div className="prose dark:prose-invert text-center pb-4">
        <h1>{msgStr("doLogIn")}</h1>
      </div>

      <div className="flex flex-col space-y-4">

        {/* Password Login */}
        {realm.password && (
          <form
            className="flex flex-col space-y-4"
            onSubmit={onSubmit}
            action={url.loginAction}
            method="post"
          >
            <input
              type="hidden"
              name="credentialId"
              value={auth?.selectedCredential || ''}
            />

            {!usernameHidden && <UsernameInput {...{...props, isSubmitted}} />}

            <PasswordInput {...{...props, isSubmitted}} />

            {(realm.rememberMe && !usernameHidden) && (
              <RememberMeCheckbox {...{...props, isSubmitted}} />
            )}

            <SubmitButton {...{...props, isSubmitted}} />

          </form>
        )}

        <SocialProviders {...props} />
        <RegistrationButton {...props} />

      </div>
    </Template>
  );
}
