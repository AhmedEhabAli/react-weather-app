import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const isProduction = process.env.NODE_ENV === "production";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: !isProduction,

    backend: {
      loadPath: isProduction
        ? "/react-weather-app/locales/{{lng}}/translation.json"
        : "/locales/{{lng}}/translation.json",
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
