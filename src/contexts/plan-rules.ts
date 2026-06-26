export const PLAN_RULES = {
  FREE: {
    dashboard: true,
  },

  STARTER: {
    dashboard: true,
    operacional: true,
    pdv: true,
    financial: true,
    settings: true,
    // crm: ['leads', 'contacts'],
  },

  PRO: {
    dashboard: true,
    crm: true,
    operacional: ['products'],
    reports: true,
  },

  ENTERPRISE: {
    dashboard: true,
    crm: true,
    operacional: true,
    pdv: true,
    automation: true,
    ai: true,
    reports: true,
    integrations: true,
    financial: true,
    settings: true,
  },
} as const;
