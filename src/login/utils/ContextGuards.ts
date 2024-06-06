import {KcContext} from "../kcContext.ts";
import LoginUpdatePassword from "../pages/LoginUpdatePassword.tsx";

export function isLoginContext(kcContext: KcContext): kcContext is Extract<KcContext, { pageId: "login.ftl" }> {
  return kcContext.pageId === "login.ftl";
}

export function isLoginUsernameContext(kcContext: KcContext): kcContext is Extract<KcContext, { pageId: "login-username.ftl" }> {
  return kcContext.pageId === "login-username.ftl";
}

export function isLoginPasswordContext(kcContext: KcContext): kcContext is Extract<KcContext, { pageId: "login-password.ftl" }> {
  return kcContext.pageId === "login-password.ftl";
}

export function isLoginOtpContext(kcContext: KcContext): kcContext is Extract<KcContext, { pageId: "login-otp.ftl" }> {
  return kcContext.pageId === "login-otp.ftl";
}

export function isLoginResetPasswordContext(kcContext: KcContext): kcContext is Extract<KcContext, { pageId: "login-reset-password.ftl" }> {
  return kcContext.pageId === "login-reset-password.ftl";
}

export function isLoginUpdatePasswordContext(kcContext: KcContext): kcContext is Extract<KcContext, { pageId: "login-reset-password.ftl" }> {
  return kcContext.pageId === "login-update-password.ftl";
}
