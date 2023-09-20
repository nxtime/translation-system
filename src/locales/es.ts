import { TTranslation } from "./en";

const SpanishTranslation: TTranslation = {
  common: {
    ok: "Aceptar",
    workgroup: "Grupo de Trabajo",
    "not-found": "No Encontrado",
    period: "Periodo",
    settings: "Configuraciones",
    home: "Inicio",
    user: "Usuario",
    tenant: "Inquilino",
    admin: "Administrador",
    calls: "Llamadas",
    viewer: "Visualizador",
    role: "Rol",
    roles: "Roles",
    attempt: "Intento",
    add: "Agregar",
    adherence: "Adhesión",
    "file-type": "Tipo de Archivo",
    file: "Archivo",
    "contact-right-person": "Contactar a la Persona Correcta",
    error: "Error",
    cancel: "Cancelar",
    "real-time": "Tiempo Real",
    back: "Volver",
    name: "Nombre",
    email: "Correo Electrónico",
    group: "Grupo",
    password: "Contraseña",
    services: "Servicios",
    visualization: "Visualización",
    table: "Tabla",
    chart: "Gráfico",
    continue: "Continuar",
    close: "Cerrar",
    save: "Guardar",
    open: "Abrir",
    break: "Descanso",
    breaks: "Descansos",
    edit: "Editar",
    logout: "Cerrar Sesión",
    new: "Nuevo",
    agents: "Agentes",
    agent: "Agente",
    users: "Usuarios",
    applications: "Aplicaciones",
    general: "General",
    workgroups: "Grupos de Trabajo",
    scalesgroups: "Grupo de Escalas",
    scales: "Escalas",
    remove: "Eliminar",
    company: "Empresa",
    companies: "Empresas",
    database: "Bases de Datos",
    theme: "Tema",
    language: "Idioma",
    search: "Buscar",
    done: "Hecho",
    next: "Siguiente",
    previous: "Anterior",
    loading: "Cargando",
    journey: "Trayecto",
    action: "Acción",
    start: "Comenzar",
    entry: "Entrada",
    end: "Fin",
    finish: "Finalizar",
    weekdays: "Días de la Semana",
    weekdaysNames: {
      sunday: "Domingo",
      monday: "Lunes",
      tuesday: "Martes",
      wednesday: "Miércoles",
      thursday: "Jueves",
      friday: "Viernes",
      saturday: "Sábado"
    },
    charts: {
      types: "Tipos de Gráficos",
      bar: "Barra",
      line: "Línea",
      time: "Tiempo"
    }
  },
  complement: {
    add: "Agregar {{complement}}",
    select: "Seleccionar {{complement}}",
    remove: "Eliminar {{complement}}",
    name: "Nombre de {{complement}}",
    new: "Nuevo {{complement}}",
    edit: "Editar {{complement}}",
    open: "Abrir {{complement}}",
    close: "Cerrar {{complement}}"
  },
  settings: {
    "application-title": "Seleccione una empresa y una base de datos",
    tabs: {
      personal: "Personal",
      application: "Aplicación"
    },
    themes: {
      coffe: "Café",
      light: "Claro",
      dark: "Oscuro",
      forest: "Bosque"
    },
    langs: {
      english: "Inglés",
      portuguese: "Portugués",
      spanish: "Español"
    }
  },
  messages: {
    "not-found": "No se encontró {{item}}",
    typing: "Escribe tu {{item}}...",
    success: "{{item}} {{action}} exitosamente",
    failed: "{{item}} {{action}} falló"
  },
  table: {
    page: "Página",
    of: "de",
    "per-page": "Por página",
    items: "Elementos"
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
        sa: "Sá"
      }
    }
  },
  select: {
    "select-one": "Selecciona una de las opciones"
  },
  sidebar: {
    general: "General",
    agents: "Agentes",
    users: "Usuarios",
    services: "Servicios",
    calls: "Llamadas",
    "contact-right-person": "Contactar a la Persona Correcta",
    dashboard: "Tablero",
    adherence: "Adhesión",
    "real-time": "Tiempo Real",
    workgroups: "Grupos de Trabajo",
    staffing: "Personal",
    home: "Inicio",
    scales: "Escalas",
    scalesgroups: "Grupos de Escalas",
    forecast: "Pronóstico"
  },
  actions: {
    create: "crear",
    created: "creado",
    download: "descargar",
    downloaded: "descargado",
    update: "actualizar",
    updated: "actualizado",
    remove: "eliminar",
    removed: "eliminado"
  },
  data: {
    users: {
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo Electrónico",
      role: "Rol",
      active: "Activo"
    },
    workgroups: {
      name: "Nombre",
      agents: "Agentes",
      workGroups: "Grupos de Trabajo",
      timeScale: "Escala de Tiempo",
      supervisor: "Supervisor"
    },
    scales: {
      firstName: "Nombre",
      lastName: "Apellido",
      baseUserId: "ID del Usuario Base"
    },
    scalesgroups: {
      name: "Nombre",
      timeScale: "Escala de Tiempo",
      workGroups: "Grupos de Trabajo",
      breaks: "Descansos"
    },
    services: {
      attempts: "Intentos",
      hour: "Hora",
      answereds: "Atendidas",
      contact_right_person: "Contactar a la Persona Correcta",
      loggeds_agents: "Agentes Registrados",
      average_service_time: "Tiempo Promedio de Servicio",
      occupancyRate: "Tasa de Ocupación",
      productivityRate: "Tasa de Productividad",
      availabilityFee: "Tarifa de Disponibilidad",
      averageTimeLoggedIn: "Tiempo Promedio Conectado",
      averageTimeSpoken: "Tiempo Promedio Hablado",
      averageIdleTime: "Tiempo Promedio de Inactividad",
      averageOperatingTime: "Tiempo Promedio de Operación",
      hitRate: "Tasa de Éxito"
    },
    charts: {
      absenteeism: "Absentismo",
      topAdherenceOffenders: "Principales Infractores de Adhesión",
      mediumWorkGroupsAdherence: "Adhesión Media de Grupos de Trabajo",
      totalWorkGroupsExtraHours: "Total de Horas Extra de Grupos de Trabajo",
      mediumWorkGroupsBreaksTimes: "Tiempos Medios de Descansos de Grupos de Trabajo",
      mediumWorkGroupsLoggedTimes: "Tiempos Medios de Registro de Grupos de Trabajo"
    },
    "real-time": {
      serviceName: "Nombre del Servicio",
      serviceId: "ID del Servicio",
      allAgentsLoggeds: "Agentes Conectados",
      allAgentsInCall: "Agentes en Llamada",
      allAgentIdle: "Agentes Inactivos",
      allAgentNotReady: "Agentes No Listos",
      allAgentOthers: "Otros",
      occupancyRate: "Tasa de Ocupación",
      inHold: "En Espera",
      inWrap: "En Finalización",
      date: "Fecha",
      totalCalls: "Total de Llamadas",
      answered: "Atendidas",
      answeredPercentage: "Porcentaje Atendidas",
      notAnswered: "No Atendidas",
      notAnsweredPercentage: "Porcentaje No Atendidas",
      busy: "Ocupadas",
      busyPercentage: "Porcentaje Ocupadas",
      notAttend: "No Atendidas",
      notAttendPercentage: "Porcentaje No Atendidas",
      message: "Mensaje",
      messagePercentage: "Porcentaje de Mensajes",
      cpc: "Contactar a la Persona Correcta"
    },
    adherence: {
      companyOperationBreakScaledTime: "Tempo Total de Pausa Escalada da Empresa",
      companyOperationBreakWorkedTime: "Tempo Total de Pausa Trabalhada da Empresa",
      companyOperationLoggedTime: "Tempo de Operação Ativa da Empresa",
      companyOperationScaledTime: "Tempo de Operação Escalada da Empresa",
      totalCompanyAdherence: "Total de Aderência da Empresa",
      totalCompanyBreaksAdherence: "Total de Aderência em Pausas da Empresa",
      groupName: "Nome do Grupo",
      agents: "Agentes",
      totalOperationLoggedTime: "Tempo Total Logado da Opereação",
      totalOperationBreakWorkedTime: "Tempo Total de Pausa Trabalhada da Operação",
      totalOperationScaledTime: "Tempo Total Escalado da Operação",
      totalOperationBreakScaledTime: "Tempo Total de Pausa Escala da Operação",
      breakAdherence: "Pausa em Aderência",
      adherence: "Aderência",
    },
  }
};


export default SpanishTranslation;
