import { TTranslation } from "./en";

const PortugueseTranslation: TTranslation = {
  common: {
    ok: "OK",
    settings: "Configurações",
    error: "Erro",
    home: "Menu inicial",
    add: "Adicionar",
    cancel: "Cancelar",
    "not-found": "Não encontrado",
    user: "Usuário",
    admin: "Administrador",
    viewer: "Visualizador",
    password: "Senha",
    role: "Cargo",
    roles: "Cargos",
    users: "Usuarios",
    agents: "Agentes",
    general: "Geral",
    applications: "Aplicações",
    agent: "Agente",
    back: "Voltar",
    name: "Nome",
    email: "Email",
    group: "Grupo",
    services: "Serviços",
    visualization: "Visualização",
    table: "Tabela",
    chart: "Gráfico",
    continue: "Continuar",
    tenant: "Supervisor",
    close: "Fechar",
    save: "Salvar",
    open: "Abrir",
    edit: "Editar",
    logout: "Sair",
    new: "Novo",
    workgroups: "Grupos de Trabalho",
    scalesgroups: "Grupo de Escalas",
    remove: "Remover",
    scales: "Escalas",
    company: "Empresa",
    companies: "Empresas",
    database: "Bancos de Dados",
    theme: "Tema",
    break: "Pausa",
    breaks: "Pausas",
    language: "Idioma",
    search: "Buscar",
    done: "Concluído",
    next: "Próximo",
    previous: "Anterior",
    loading: "Carregando",
    action: "Ação",
    entry: "Entrada",
    journey: "Jornada",
    start: "Início",
    end: "Saída",
    finish: "Fim",
  },
  complement: {
    add: "Adicionar {{complement}}",
    select: "Selecionar {{complement}}",
    remove: "Remover {{complement}}",
    new: "Novo {{complement}}",
    name: "Nome do {{complement}}",
    edit: "Editar {{complement}}",
    open: "Abrir {{complement}}",
    close: "Fechar {{complement}}",
  },
  settings: {
    "application-title": "Selecione uma empresa e banco de dados",
    tabs: {
      application: "Aplicação",
      personal: "Pessoal",
    },
    themes: {
      coffe: "Café",
      light: "Claro",
      dark: "Escuro",
      forest: "Floresta",
    },
    langs: {
      english: "Inglês",
      portuguese: "Português",
      spanish: "Espanhol",
    },
  },
  table: {
    page: "Página",
    of: "de",
    "per-page": "Por página",
    items: "Itens",
  },
  picker: {
    date: {
      days: {
        su: "Dom",
        mo: "Seg",
        tu: "Ter",
        we: "Qua",
        th: "Qui",
        fr: "Sex",
        sa: "Sáb",
      },
    },
  },
  select: {
    "select-one": "Selecione uma das opções",
  },
  messages: {
    "not-found": "Nenhum(a) {{item}} foi encontrado(a)",
    typing: "Digite o(a) {{item}}...",
    success: "{{item}} {{action}} com sucesso",
    failed: "{{item}} {{action}} com falha",
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
  actions: {
    create: "criar",
    created: "criado",
    update: "atualizar",
    updated: "atualizado",
    remove: "remover",
    removed: "removido",
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
      name: "Nome",
      agents: "Agentes",
      workGroups: "Grupos de Trabalho",
      timeScale: "Tempo de Escala",
      supervisor: "Supervisor",
    },
    scales: {
      firstName: "Nome",
      lastName: "Sobrenome",
      baseUserId: "ID de Usuário Base",
    },
    scalesgroups: {
      name: "Nome",
      timeScale: "Escala de Tempo",
      workGroups: "Grupos de Trabalho",
      breaks: "Pausas",
    },
    services: {
      attempts: "Tentativas",
      hour: "Hora",
      answereds: "Respostas",
      contact_right_person: "Contato com a pessoa certa",
      loggeds_agents: "Agentes logados",
      average_service_time: "Tempo médio de serviço",
    },
    charts: {
      absenteeism: "Absenteismo",
      topAdherenceOffenders: "Maiores Ofendedores de Aderência",
      mediumWorkGroupsAdherence: "Aderência Média de Grupo de Trabalho",
      totalWorkGroupsExtraHours: "Total de Horas Extras por Grupo de Trabalho",
      mediumWorkGroupsBreaksTimes: "Tempo Médio de Pausa por Grupo de Trabalho",
      mediumWorkGroupsLoggedTimes: "Tempo Médio Logado por Grupo de Trabalho",
    },
  },
};

export default PortugueseTranslation;
