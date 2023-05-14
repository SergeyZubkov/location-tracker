import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { AvailableLanguage } from "../models/common.interface";

const resources = {};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  interpolation: {
    escapeValue: false,
  },
  lng: AvailableLanguage.ru,
  resources,
});

export default i18n;
