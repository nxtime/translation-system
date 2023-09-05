import { changeLanguage } from "i18next";
import { TLanguages } from "interfaces/languages";

const changeAppTranslationLanguage = (language: TLanguages) => {
  changeLanguage(language);
};

export default changeAppTranslationLanguage;
