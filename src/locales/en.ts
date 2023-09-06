const EnglishTranslation = {
  common: {
    ok: "Okay",
    "not-found": "Not Found",
    error: "Error",
    cancel: "Cancel",
    back: "Back",
    name: "Name",
    group: "Group",
    continue: "Continue",
    close: "Close",
    save: "Save",
    open: "Open",
    break: "Break",
    breaks: "Breaks",
    edit: "Edit",
    logout: "Log Out",
    new: "New",
    workgroups: "Work Groups",
    scalesgroups: "Scales Group",
    scales: "Scales",
    remove: "Remove",
    company: "Company",
    companies: "Companies",
    database: "Databases",
    theme: "Theme",
    language: "Language",
    search: "Search",
    done: "Done",
    next: "Next",
    previous: "Previous",
    loading: "Loading",
    journey: "Journey",
    action: "Action",
    start: "Start",
    entry: "Entry",
    end: "End",
    finish: "Finish",
  },
  complement: {
    add: "Add {{complement}}",
    select: "Select {{complement}}",
    remove: "Remove {{complement}}",
    name: "{{complement}}`s name",
    new: "New {{complement}}",
    edit: "Edit {{complement}}",
    open: "Open {{complement}}",
    close: "Close {{complement}}",
  },
  settings: {
    "application-title": "Select a company and database",
    tabs: {
      personal: "Pessoal",
      application: "Aplicação",
    },
    themes: {
      coffe: "Coffee",
      light: "Light",
      dark: "Dark",
      forest: "Forest",
    },
    langs: {
      english: "English",
      portuguese: "Portuguese",
      spanish: "Spanish",
    },
  },
  messages: {
    "not-found": "No {{item}} was found",
    typing: "Type your {{item}}...",
  },
  table: {
    page: "Page",
    of: "of",
    "per-page": "Per page",
    items: "Items",
  },
  picker: {
    date: {
      days: {
        su: "Su",
        mo: "Mo",
        tu: "Tu",
        we: "We",
        th: "Th",
        fr: "Fr",
        sa: "Sa",
      },
    },
  },
  data: {
    workgroups: {
      name: "Name",
      agents: "Agents",
      supervisor: "Supervisor",
    },
    scales: {
      firstName: "First Name",
      lastName: "Last Name",
      baseUserId: "Base User ID",
    },
    scalesgroups: {
      name: "Name",
      timeScale: "Time Scale",
      workGroups: "Work Groups",
      breaks: "Breaks",
    },
  },
};

type TTranslation = typeof EnglishTranslation;

export type { TTranslation };

export default EnglishTranslation;