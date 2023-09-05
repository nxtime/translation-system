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
    language: "Language"
  },
  settings: {
    "application-title": "Select a company and database" 
  },
  table: {
    workgroups: {
      name: "Name",
      agents: "Agents",
      supervisor: "Supervisor"
    },
    scales: {
      firstName: "First Name",
      lastName: "Last Name",
      baseUserId: "Base User ID"
    },
    scalesgroups: {
      name: "Name",
      timeScale: "Time Scale",
      workGroups: "Work Groups"
    }
  },
  themes: {
    coffe: "Coffee",
    light: "Light",
    dark: "Dark",
    forest: "Forest"
  },
  langs: {
    english: "English",
    portuguese: "Portuguese",
    spanish: "Spanish"
  }
};

type TTranslation = typeof EnglishTranslation;

export type { TTranslation };

export default EnglishTranslation;
