import { TTranslation } from "./en";

const SpanishTranslation: TTranslation = {
  common: {
    ok: "Aceptar",
    add: "Adicionar",
    home: "Menu inicial",
    settings: "Configuracion",
    error: "Error",
    users: "Usuarios",
    agents: "Agentes",
    user: "Usuário",
    admin: "Administrador",
    viewer: "Visualizador",
    role: "Cargo",
    roles: "Cargos",
    agent: "Agente",
    general: "Geral",
    password: "Senha",
    tenant: "Supervisor",
    email: "Email",
    applications: "Applicaciones",
    "not-found": "Não encontrado",
    cancel: "Cancelar",
    back: "Volver",
    name: "Nombre",
    group: "Grupo",
    continue: "Continuar",
    services: "Serviços",
    visualization: "Visualização",
    table: "Tabla",
    chart: "Gráfico",
    close: "Cerrar",
    save: "Guardar",
    open: "Abrir",
    break: "Pausa",
    breaks: "Pausas",
    edit: "Editar",
    logout: "Cerrar sesión",
    new: "Nuevo",
    workgroups: "Grupos de Trabajo",
    scalesgroups: "Grupo de Escalas",
    scales: "Escalas",
    company: "Empresa",
    remove: "Remover",
    companies: "Empresas",
    database: "Bases de Datos",
    theme: "Tema",
    language: "Idioma",
    search: "Buscar",
    done: "Hecho",
    next: "Siguiente",
    previous: "Anterior",
    entry: "Entrada",
    loading: "Cargando",
    action: "Acción",
    start: "Início",
    journey: "Jornada",
    end: "Saída",
    finish: "Fim",
  },
  complement: {
    add: "Agregar {{complement}}",
    select: "Seleccionar {{complement}}",
    remove: "Eliminar {{complement}}",
    name: "Nombre del {{complement}}",
    new: "Nuevo {{complement}}",
    edit: "Editar {{complement}}",
    open: "Abrir {{complement}}",
    close: "Cerrar {{complement}}",
  },
  settings: {
    "application-title": "Seleccione una empresa y una base de datos",
    tabs: {
      application: "Applicacion",
      personal: "Pessoal",
    },
    themes: {
      coffe: "Café",
      light: "Claro",
      dark: "Oscuro",
      forest: "Bosque",
    },
    langs: {
      english: "Inglés",
      portuguese: "Portugués",
      spanish: "Español",
    },
  },
  table: {
    page: "Página",
    of: "de",
    "per-page": "Por página",
    items: "Elementos",
  },
  picker: {
    date: {
      days: {
        su: "Do",
        mo: "Lu",
        tu: "Ma",
        we: "Mi",
        th: "Ju",
        fr: "Vi",
        sa: "Sá",
      },
    },
  },
  messages: {
    "not-found": "Nenhum(a) {{item}} foi encontrado(a)",
    typing: "Digite o(a) {{item}}...",
    success: "{{item}} {{action}} com sucesso",
    failed: "{{item}} {{action}} com falha",
  },
  actions: {
    create: "criar",
    created: "criado",
    update: "atualizar",
    updated: "atualizado",
    remove: "remover",
    removed: "removido",
  },
  select: {
    "select-one": "Selecione uma das opções",
  },
  data: {
    users: {
      firstName: "Nome",
      lastName: "Sobrenome",
      email: "Email",
      role: "Cargo",
      active: "Ativo",
    },
    workgroups: {
      name: "Nombre",
      agents: "Agentes",
      workGroups: "Grupos de Trabalho",
      timeScale: "Tempo de Escala",
      supervisor: "Supervisor",
    },
    scales: {
      firstName: "Nombre",
      lastName: "Apellido",
      baseUserId: "ID de Usuario Base",
    },
    scalesgroups: {
      name: "Nombre",
      timeScale: "Escala de Tiempo",
      workGroups: "Grupos de Trabajo",
      breaks: "Intervalos",
    },
    services: {
      attempts: "Intentos",
      hour: "Hora",
      answereds: "Respostas",
      contact_right_person: "Contato con la persona cierta",
      loggeds_agents: "Agentes Logados",
      average_service_time: "Tempo médio de serviço",
    },
    sidebar: {
      home: "Inicial",
      general: "Geral",
      services: "Serviços",
      calls: "Chamadas",
      dashboard: "Dashboard",
      adherence: "Aderência",
      "real-time": "Tempo Real",
      workgroups: "Grupo de Trabalhos",
      staffing: "Pessoal",
      scales: "Escalas",
      scalesgroups: "Grupo de Escalas",
      forcast: "Forcast",
    },
  },
};

export default SpanishTranslation;
