declare const EnglishTranslation: {
    common: {
        ok: string;
        error: string;
        cancel: string;
        back: string;
        continue: string;
        close: string;
        save: string;
        open: string;
        edit: string;
        logout: string;
        new: string;
        workgroups: string;
        scalesgroups: string;
        scales: string;
        company: string;
        companies: string;
        database: string;
        theme: string;
        language: string;
        search: string;
        done: string;
        next: string;
        previous: string;
        loading: string;
        action: string;
    };
    complement: {
        add: string;
        select: string;
        remove: string;
        new: string;
        edit: string;
        open: string;
        close: string;
    };
    settings: {
        "application-title": string;
    };
    table: {
        page: string;
        of: string;
        "per-page": string;
        items: string;
    };
    picker: {
        date: {
            days: {
                su: string;
                mo: string;
                tu: string;
                we: string;
                th: string;
                fr: string;
                sa: string;
            };
        };
    };
    data: {
        workgroups: {
            name: string;
            agents: string;
            supervisor: string;
        };
        scales: {
            firstName: string;
            lastName: string;
            baseUserId: string;
        };
        scalesgroups: {
            name: string;
            timeScale: string;
            workGroups: string;
        };
    };
    themes: {
        coffe: string;
        light: string;
        dark: string;
        forest: string;
    };
    langs: {
        english: string;
        portuguese: string;
        spanish: string;
    };
};
type TTranslation = typeof EnglishTranslation;
export type { TTranslation };
export default EnglishTranslation;
