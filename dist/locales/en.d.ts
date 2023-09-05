declare const EnglishTranslation: {
    common: {
        ok: string;
        error: string;
        cancel: string;
        back: string;
        continue: string;
        logout: string;
    };
};
type TTranslation = typeof EnglishTranslation;
export type { TTranslation };
export default EnglishTranslation;
