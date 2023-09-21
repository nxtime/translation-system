declare const EnglishTranslation: {
    common: {
        ok: string;
        workgroup: string;
        "not-found": string;
        "accumulated-in-day": string;
        data: string;
        settings: string;
        period: string;
        dates: string;
        home: string;
        user: string;
        tenant: string;
        "remember-me": string;
        admin: string;
        calls: string;
        viewer: string;
        role: string;
        roles: string;
        attempt: string;
        add: string;
        adherence: string;
        "file-type": string;
        file: string;
        "contact-right-person": string;
        error: string;
        cancel: string;
        "real-time": string;
        back: string;
        name: string;
        email: string;
        group: string;
        password: string;
        services: string;
        visualization: string;
        table: string;
        chart: string;
        continue: string;
        close: string;
        save: string;
        open: string;
        break: string;
        breaks: string;
        edit: string;
        logout: string;
        "sign-in": string;
        new: string;
        agents: string;
        agent: string;
        users: string;
        applications: string;
        general: string;
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
        weekdays: string;
        weekdaysNames: {
            sunday: string;
            monday: string;
            tuesday: string;
            wednesday: string;
            thursday: string;
            friday: string;
            saturday: string;
        };
        charts: {
            types: string;
            bar: string;
            line: string;
            time: string;
        };
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
        success: string;
        failed: string;
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
    select: {
        "select-one": string;
    };
    sidebar: {
        general: string;
        agents: string;
        users: string;
        services: string;
        calls: string;
        "contact-right-person": string;
        dashboard: string;
        adherence: string;
        "real-time": string;
        workgroups: string;
        staffing: string;
        home: string;
        scales: string;
        scalesgroups: string;
        forecast: string;
    };
    conditions: {
        none: string;
        greater: string;
        greaterOrEqual: string;
        lesser: string;
        lesserOrEqual: string;
        equal: string;
        different: string;
    };
    actions: {
        create: string;
        created: string;
        download: string;
        downloaded: string;
        update: string;
        updated: string;
        remove: string;
        removed: string;
    };
    data: {
        users: {
            firstName: string;
            lastName: string;
            email: string;
            role: string;
            active: string;
        };
        workgroups: {
            name: string;
            agents: string;
            workGroups: string;
            timeScale: string;
            supervisor: string;
        };
        agents: {
            firstName: string;
            lastName: string;
            name: string;
            email: string;
            baseUserId: string;
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
            average_service_time: string;
            occupancyRate: string;
            productivityRate: string;
            availabilityFee: string;
            averageTimeLoggedIn: string;
            averageTimeSpoken: string;
            averageIdleTime: string;
            averageOperatingTime: string;
            hitRate: string;
        };
        charts: {
            absenteeism: string;
            topAdherenceOffenders: string;
            mediumWorkGroupsAdherence: string;
            totalWorkGroupsExtraHours: string;
            mediumWorkGroupsBreaksTimes: string;
            mediumWorkGroupsLoggedTimes: string;
        };
        "real-time": {
            serviceName: string;
            serviceId: string;
            allAgentsLoggeds: string;
            allAgentsInCall: string;
            allAgentIdle: string;
            allAgentNotReady: string;
            allAgentOthers: string;
            occupancyRate: string;
            inHold: string;
            inWrap: string;
            date: string;
            totalCalls: string;
            answered: string;
            answeredPercentage: string;
            notAnswered: string;
            notAnsweredPercentage: string;
            busy: string;
            busyPercentage: string;
            notAttend: string;
            notAttendPercentage: string;
            message: string;
            messagePercentage: string;
            cpc: string;
        };
        adherence: {
            companyOperationBreakScaledTime: string;
            companyOperationBreakWorkedTime: string;
            companyOperationLoggedTime: string;
            companyOperationScaledTime: string;
            totalCompanyAdherence: string;
            totalCompanyBreaksAdherence: string;
            groupName: string;
            agents: string;
            totalOperationLoggedTime: string;
            totalOperationBreakWorkedTime: string;
            totalOperationScaledTime: string;
            totalOperationBreakScaledTime: string;
            breakAdherence: string;
            adherence: string;
        };
        forecast: {
            hour: string;
            answereds: string;
            attempts: string;
            hitRate: string;
            averageServiceTime: string;
            contactRightPerson: string;
            contactRightPersonRatePerTotal: string;
            contactRightPersonRatePerAnswered: string;
            loggedsAgents: string;
        };
    };
};
type TTranslation = typeof EnglishTranslation;
export type { TTranslation };
export default EnglishTranslation;
