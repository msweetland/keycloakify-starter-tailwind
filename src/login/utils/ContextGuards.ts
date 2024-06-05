import {KcContext} from "../kcContext.ts";

export function isLoginContext(kcContext: KcContext): kcContext is Extract<KcContext, { pageId: "login.ftl" }> {
  return kcContext.pageId === "login.ftl";
}

export function isLoginUsernameContext(kcContext: KcContext): kcContext is Extract<KcContext, { pageId: "login-username.ftl" }> {
  return kcContext.pageId === "login-username.ftl";
}

export function isLoginPasswordContext(kcContext: KcContext): kcContext is Extract<KcContext, { pageId: "login-password.ftl" }> {
  return kcContext.pageId === "login-password.ftl";
}

export function isLoginResetPasswordContext(kcContext: KcContext): kcContext is Extract<KcContext, { pageId: "login-reset-password.ftl" }> {
  return kcContext.pageId === "login-reset-password.ftl";
}
