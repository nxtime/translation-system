import { TTranslation } from "./en";

const PortugueseTranslation: TTranslation = {
  common: {
    ok: "Ok",
    workgroup: "Grupo de Trabalho",
    period: "Periodo",
    dates: "Datas",
    "accumulated-in-day": "Acumulado no dia",
    data: "Dados",
    "not-found": "Não Encontrado",
    settings: "Configurações",
    home: "Início",
    user: "Usuário",
    tenant: "Inquilino",
    admin: "Administrador",
    calls: "Chamadas",
    "remember-me": "Lembrar-me",
    "sign-in": "Logar",
    viewer: "Visualizador",
    role: "Cargo",
    roles: "Cargos",
    attempt: "Tentativa",
    add: "Adicionar",
    adherence: "Aderência",
    "file-type": "Tipo de Arquivo",
    file: "Arquivo",
    "contact-right-person": "Contatar a Pessoa Certa",
    error: "Erro",
    cancel: "Cancelar",
    "real-time": "Tempo Real",
    back: "Voltar",
    name: "Nome",
    email: "E-mail",
    group: "Grupo",
    password: "Senha",
    services: "Serviços",
    visualization: "Visualização",
    table: "Tabela",
    chart: "Gráfico",
    continue: "Continuar",
    close: "Fechar",
    save: "Salvar",
    open: "Abrir",
    break: "Pausa",
    breaks: "Pausas",
    edit: "Editar",
    logout: "Sair",
    new: "Novo",
    agents: "Agentes",
    agent: "Agente",
    users: "Usuários",
    applications: "Aplicações",
    general: "Geral",
    workgroups: "Grupos de Trabalho",
    scalesgroups: "Grupo de Escalas",
    scales: "Escalas",
    remove: "Remover",
    company: "Empresa",
    companies: "Empresas",
    database: "Banco de Dados",
    theme: "Tema",
    language: "Idioma",
    search: "Pesquisar",
    done: "Concluído",
    next: "Próximo",
    previous: "Anterior",
    loading: "Carregando",
    journey: "Jornada",
    action: "Ação",
    start: "Início",
    entry: "Entrada",
    end: "Fim",
    finish: "Terminar",
    weekdays: "Dias da Semana",
    weekdaysNames: {
      sunday: "Domingo",
      monday: "Segunda-feira",
      tuesday: "Terça-feira",
      wednesday: "Quarta-feira",
      thursday: "Quinta-feira",
      friday: "Sexta-feira",
      saturday: "Sábado",
    },
    charts: {
      types: "Tipos de Gráfico",
      bar: "Barra",
      line: "Linha",
      time: "Tempo",
    },
  },
  complement: {
    add: "Adicionar {{complement}}",
    select: "Selecionar {{complement}}",
    remove: "Remover {{complement}}",
    name: "Nome de {{complement}}",
    new: "Novo {{complement}}",
    edit: "Editar {{complement}}",
    open: "Abrir {{complement}}",
    close: "Fechar {{complement}}",
  },
  settings: {
    "application-title": "Selecione uma empresa e banco de dados",
    tabs: {
      personal: "Pessoal",
      application: "Aplicação",
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
  messages: {
    "not-found": "Nenhum(a) {{item}} foi encontrado(a)",
    typing: "Digite o seu {{item}}...",
    success: "{{item}} {{action}} realizado com sucesso",
    failed: "{{item}} {{action}} falhou",
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
  sidebar: {
    general: "Geral",
    agents: "Agentes",
    users: "Usuários",
    services: "Serviços",
    calls: "Chamadas",
    "contact-right-person": "Contatar a Pessoa Certa",
    dashboard: "Painel",
    adherence: "Aderência",
    "real-time": "Tempo Real",
    workgroups: "Grupos de Trabalho",
    staffing: "Alocação de Pessoal",
    home: "Início",
    scales: "Escalas",
    scalesgroups: "Grupos de Escalas",
    forecast: "Previsão",
  },
  actions: {
    create: "criar",
    created: "criado",
    download: "baixar",
    downloaded: "baixado",
    update: "atualizar",
    updated: "atualizado",
    remove: "remover",
    removed: "removido",
  },
  conditions: {
    none: "Nenhum",
    greater: "Maior",
    greaterOrEqual: "Acima ou Igual",
    lesser: "Menor",
    lesserOrEqual: "Menor ou Igual",
    equal: "Equal",
    different: "Diferente",
  },
  data: {
    users: {
      firstName: "Primeiro Nome",
      lastName: "Sobrenome",
      email: "E-mail",
      role: "Cargo",
      active: "Ativo",
    },
    agents: {
      firstName: "Nome",
      name: "Nome",
      lastName: "Sobrenome",
      email: "Email",
      baseUserId: "Usuário Base",
    },
    workgroups: {
      name: "Nome",
      agents: "Agentes",
      workGroups: "Grupos de Trabalho",
      timeScale: "Escala de Tempo",
      supervisor: "Supervisor",
    },
    scales: {
      firstName: "Primeiro Nome",
      lastName: "Sobrenome",
      baseUserId: "ID do Usuário Base",
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
      answereds: "Atendidas",
      contact_right_person: "Contatar a Pessoa Certa",
      loggeds_agents: "Agentes Registrados",
      average_service_time: "Tempo Médio de Atendimento",
      occupancyRate: "Taxa de Ocupação",
      productivityRate: "Taxa de Produtividade",
      availabilityFee: "Taxa de Disponibilidade",
      averageTimeLoggedIn: "Tempo Médio Logado",
      averageTimeSpoken: "Tempo Médio Falado",
      averageIdleTime: "Tempo Médio de Inatividade",
      averageOperatingTime: "Tempo Médio de Operação",
      hitRate: "Taxa de Acerto",
    },
    charts: {
      absenteeism: "Absenteísmo",
      topAdherenceOffenders: "Principais Infratores de Adesão",
      mediumWorkGroupsAdherence: "Adesão Média dos Grupos de Trabalho",
      totalWorkGroupsExtraHours: "Total de Horas Extras dos Grupos de Trabalho",
      mediumWorkGroupsBreaksTimes:
        "Tempo Médio de Pausas dos Grupos de Trabalho",
      mediumWorkGroupsLoggedTimes: "Tempo Médio Logado dos Grupos de Trabalho",
    },
    "real-time": {
      serviceName: "Nome do Serviço",
      serviceId: "ID do Serviço",
      allAgentsLoggeds: "Agentes Logados",
      allAgentsInCall: "Agentes em Chamada",
      allAgentIdle: "Agentes Inativos",
      allAgentNotReady: "Agentes Não Prontos",
      allAgentOthers: "Outros",
      occupancyRate: "Taxa de Ocupação",
      inHold: "Em Espera",
      inWrap: "Em Finalização",
      date: "Data",
      totalCalls: "Total de Chamadas",
      answered: "Atendidas",
      answeredPercentage: "Percentual Atendido",
      notAnswered: "Não Atendidas",
      notAnsweredPercentage: "Percentual Não Atendido",
      busy: "Ocupadas",
      busyPercentage: "Percentual Ocupado",
      notAttend: "Não Atendidas",
      notAttendPercentage: "Percentual Não Atendido",
      message: "Mensagem",
      messagePercentage: "Percentual de Mensagens",
      cpc: "Contatar a Pessoa Certa",
    },
    adherence: {
      companyOperationBreakScaledTime:
        "Tempo Total de Pausa Escalada da Empresa",
      companyOperationBreakWorkedTime:
        "Tempo Total de Pausa Trabalhada da Empresa",
      companyOperationLoggedTime: "Tempo de Operação Ativa da Empresa",
      companyOperationScaledTime: "Tempo de Operação Escalada da Empresa",
      totalCompanyAdherence: "Total de Aderência da Empresa",
      totalCompanyBreaksAdherence: "Total de Aderência em Pausas da Empresa",
      groupName: "Nome do Grupo",
      agents: "Agentes",
      totalOperationLoggedTime: "Tempo Total Logado da Operação",
      totalOperationBreakWorkedTime:
        "Tempo Total de Pausa Trabalhada da Operação",
      totalOperationScaledTime: "Tempo Total Escalado da Operação",
      totalOperationBreakScaledTime: "Tempo Total de Pausa Escala da Operação",
      breakAdherence: "Pausa em Aderência",
      adherence: "Aderência",
    },
    forecast: {
      hour: "Hora",
      answereds: "Respostas",
      attempts: "Tentativas",
      hitRate: "Percentual De Acerto",
      averageServiceTime: "Tempo médio de Serviço",
      contactRightPerson: "Contatar Pessoa Certa",
      contactRightPersonRatePerTotal:
        "Percentual Total de Contatar Pessoa Certa",
      contactRightPersonRatePerAnswered:
        "Percentual por Resposta de Contatar Pessoa Certa",
      loggedsAgents: "Agentes Logados",
    },
  },
};

export default PortugueseTranslation;
