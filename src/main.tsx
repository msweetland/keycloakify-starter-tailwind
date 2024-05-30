import {createRoot} from "react-dom/client";
import {lazy, StrictMode, Suspense} from "react";
import {kcContext as kcLoginThemeContext} from "./login/kcContext";
import {kcContext as kcAccountThemeContext} from "./account/kcContext";
import '@fortawesome/fontawesome-svg-core/styles.css';

const KcLoginThemeApp = lazy(() => import("./login/KcApp"));
const KcAccountThemeApp = lazy(() => import("./account/KcApp"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense>
      {(() => {
        if (kcLoginThemeContext !== undefined) return <KcLoginThemeApp kcContext={kcLoginThemeContext}/>;
        if (kcAccountThemeContext !== undefined) return <KcAccountThemeApp kcContext={kcAccountThemeContext}/>;
      })()}
    </Suspense>
  </StrictMode>
);

