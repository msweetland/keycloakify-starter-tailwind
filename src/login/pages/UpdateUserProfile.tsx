import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "../kcContext";
import type {I18n} from "../i18n";
import SubmitButton from "../components/SubmitButton.tsx";

export default function UpdateUserProfile(props: PageProps<Extract<KcContext, { pageId: "update-user-profile.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { msgStr } = i18n;
  const { url, isAppInitiatedAction } = kcContext;

  // const [isFomSubmittable, setIsFomSubmittable] = useState(false);

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={<> </>}>
      <div className="prose dark:prose-invert text-center pb-4">
        <h1>{msgStr("loginProfileTitle")}</h1>
      </div>

      <form id="kc-update-profile-form" action={url.loginAction} method="post">

        {/*<UserProfileFormFields*/}
        {/*  kcContext={kcContext}*/}
        {/*  onIsFormSubmittableValueChange={setIsFomSubmittable}*/}
        {/*  i18n={i18n}*/}
        {/*  getClassName={undefined}*/}
        {/*/>*/}


        <SubmitButton {...{...props, isSubmitted: false}}/>

        {isAppInitiatedAction && (
          <button type="submit" name="cancel-aia" value="true" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
            {msgStr("doCancel")}
          </button>
        )}
      </form>
    </Template>
  );
}