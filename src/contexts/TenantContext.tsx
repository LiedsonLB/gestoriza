import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PLAN_RULES } from './plan-rules';
import { SYSTEM_MODULES, Module } from './modules';

export interface TenantConfig {
  name: string;
  email: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface TenantPlan {
  plan: 'FREE' | 'STARTER' | 'PRO' | 'ENTERPRISE';
  limits: {
    users: number;
    messages: number;
    storage: number;
  };
}

interface TenantContextType {
  tenant: TenantConfig;
  plan: TenantPlan;
  modules: Module[];
  setTenant: (config: TenantConfig) => void;
  setPlan: (plan: TenantPlan) => void;
  hasModule: (module: string) => boolean;
  hasFeature: (module: string, feature: string) => boolean;
  applyTheme: () => void;
}

const defaultTenant: TenantConfig = {
  name: 'Gestoriza',
  logo: '/img/icon_gestoriza.png',
  email: 'liedson.b9@gmail.com',
  primaryColor: '198.03 69.48% 51.18%',
  secondaryColor: '198.03 69.48% 51.18%',
};

const defaultPlan: TenantPlan = {
  plan: 'ENTERPRISE',
  limits: {
    users: 5,
    messages: 1000,
    storage: 5000,
  },
};

export function applyPlan(
  modules: Module[],
  planName: keyof typeof PLAN_RULES
): Module[] {
  const rules = PLAN_RULES[planName];

  return modules.map((module) => {
    const rule = rules?.[module.id];

    if (!rule) {
      return {
        ...module,
        enabled: false,
        features: module.features?.map(f => ({ ...f, enabled: false })),
      };
    }

    if (rule === true) {
      return {
        ...module,
        enabled: true,
        features: module.features?.map(f => ({ ...f, enabled: true })),
      };
    }

    if (Array.isArray(rule)) {
      return {
        ...module,
        enabled: true,
        features: module.features?.map(f => ({
          ...f,
          enabled: rule.includes(f.id),
        })),
      };
    }

    return module;
  });
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tenant, setTenantState] = useState<TenantConfig>(defaultTenant);
  const [modules, setModules] = useState<Module[]>(applyPlan(SYSTEM_MODULES, 'FREE'));
  const [plan, setPlanState] = useState<TenantPlan>({
    plan: 'STARTER',
    limits: {
      users: 5,
      messages: 1000,
      storage: 5000,
    },
  });

  useEffect(() => {
    const appliedModules = applyPlan(SYSTEM_MODULES, plan.plan);
    console.log('Applied Modules for plan', plan.plan, 'Applied Modules:', appliedModules);
    setModules(appliedModules);
  }, [plan.plan]);


  const applyTheme = () => {
    const root = document.documentElement;
    root.style.setProperty('--primary', tenant.primaryColor);
    root.style.setProperty('--ring', tenant.primaryColor);
    root.style.setProperty('--sidebar-primary', tenant.primaryColor);
    root.style.setProperty('--sidebar-ring', tenant.primaryColor);
    root.style.setProperty('--success', tenant.primaryColor);
  };

  useEffect(() => {
    applyTheme();
  }, [tenant.primaryColor]);

  const setTenant = (config: TenantConfig) => {
    setTenantState(config);
  };

  const setPlan = (newPlan: TenantPlan) => {
    setPlanState(newPlan);
  };

  const hasModule = (id: string) =>
    modules.some(m => m.id === id && m.enabled);

  useEffect(() => {
    console.log('PLAN:', plan.plan);
    console.log('MODULES:', modules);
  }, [modules, plan.plan]);

  const hasFeature = (moduleId: string, featureId: string) => {
    const module = modules.find(m => m.id === moduleId);

    if (!module || !module.enabled) return false;

    if (!module.features) return true; // módulo sem subfeatures

    const feature = module.features.find(f => f.id === featureId);
    return !!feature?.enabled;
  };

  return (
    <TenantContext.Provider value={{ tenant, plan, modules, setTenant, setPlan, hasModule, hasFeature, applyTheme }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = (): TenantContextType => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};
