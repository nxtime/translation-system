const EnglishTranslation = {
  common: {
    ok: "Okay",
    error: "Error",
    cancel: "Cancel",
    back: "Back",
    continue: "Continue",
    close: "Close",
    save: "Save",
    open: "Open",
    edit: "Edit",
    logout: "Log Out",
    new: "New",
    workgroups: "Work Groups",
    scalesgroups: "Scales Groups",
    scales: "Scales",
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
    action: "Action" 
  },
  complement: {
    add: "Add {{complement}}",
    select: "Select {{complement}}",
    remove: "Remove {{complement}}",
    new: "New {{complement}}",
    edit: "Edit {{complement}}",
    open: "Open {{complement}}",
    close: "Close {{complement}}"
  },
  settings: {
    "application-title": "Select a company and database",
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
    },
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
};

type TTranslation = typeof EnglishTranslation;

export type { TTranslation };

export default EnglishTranslation;
