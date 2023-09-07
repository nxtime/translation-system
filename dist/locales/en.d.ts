declare const EnglishTranslation: {
    common: {
        ok: string;
        "not-found": string;
        add: string;
        error: string;
        cancel: string;
        back: string;
        name: string;
        group: string;
        continue: string;
        close: string;
        save: string;
        open: string;
        break: string;
        breaks: string;
        edit: string;
        logout: string;
        new: string;
        workgroups: string;
        scalesgroups: string;
        scales: string;
        remove: string;
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
        journey: string;
        action: string;
        start: string;
        entry: string;
        end: string;
        finish: string;
    };
    complement: {
        add: string;
        select: string;
        remove: string;
        name: string;
        new: string;
        edit: string;
        open: string;
        close: string;
    };
    settings: {
        "application-title": string;
        tabs: {
            personal: string;
            application: string;
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
    messages: {
        "not-found": string;
        typing: string;
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
            breaks: string;
        };
        services: {
            attempts: string;
            hour: string;
            answereds: string;
            contact_right_person: string;
            loggeds_agents: string;
        };
    };
};
type TTranslation = typeof EnglishTranslation;
export type { TTranslation };
export default EnglishTranslation;
