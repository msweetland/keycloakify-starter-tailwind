import { createUseI18n } from "keycloakify/login";

export const { useI18n } = createUseI18n({
    // NOTE: Here you can override the default i18n messages
    // https://github.com/keycloak/keycloak/blob/cd2451d58b5c6e167415117dc2a72a7f28878588/themes/src/main/resources/theme/base/login/messages/messages_en.properties
    en: {}
});

export type I18n = NonNullable<ReturnType<typeof useI18n>>;
