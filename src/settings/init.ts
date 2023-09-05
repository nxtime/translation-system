import i18next from "i18next";
import { TLanguages } from "interfaces/languages";
import { TTranslation } from "locales/en";
import { en, es, ptBR } from "locales/index";

const initAppTranslation = ({ language = "en" }: { language: TLanguages }) => {
  i18next.init({
    lng: language,
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      "pt-BR": { translation: ptBR },
      es: { translation: es },
    } as Record<TLanguages, { translation: TTranslation }>,
  });
};

export default initAppTranslation;
