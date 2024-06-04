import {type FormEventHandler, useState} from "react";
import {useConstCallback} from "keycloakify/tools/useConstCallback";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "../kcContext";
import type {I18n} from "../i18n";
import PasswordInput from "../components/PasswordInput.tsx";
import SubmitButton from "../components/SubmitButton.tsx";

export default function LoginPassword(props: PageProps<Extract<KcContext, { pageId: "login-password.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, } = kcContext;

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
    e.preventDefault();
    setIsSubmitted(true);
    (e.target as HTMLFormElement).submit();
  });

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      headerNode={<></>}
    >
      <div className="w-full max-w-md mx-auto space-y-4">

        {/* Password Login */}
        <form
          className="space-y-4"
          action={url.loginAction}
          method="post"
          onSubmit={onSubmit}
        >
          <PasswordInput {...{...props, isSubmitted}}/>
          <SubmitButton {...{...props, isSubmitted }} />
        </form>

      </div>
    </Template>
  );
}