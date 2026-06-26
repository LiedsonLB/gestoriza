import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/app/auth/Login";
import Register from "./pages/app/auth/Register";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/app/Dashboard";
import Leads from "./pages/app/crm/Leads";
import Funnel from "./pages/app/crm/Funnel";
import Contacts from "./pages/app/crm/Contacts";
import Deals from "./pages/app/crm/Deals";
import History from "./pages/app/crm/History";
import Products from "./pages/app/erp/Products";
import Inventory from "./pages/app/erp/Inventory";
import Purchases from "./pages/app/erp/Purchases";
import Suppliers from "./pages/app/erp/Suppliers";
import QuickSales from "./pages/app/pdv/QuickSales";
import Cashier from "./pages/app/pdv/Cashier";
import Payments from "./pages/app/pdv/Payments";
import Receipts from "./pages/app/pdv/Receipts";
import Team from "./pages/app/settings/Team";
import WhiteLabelSettings from "./pages/app/settings/WhiteLabelSettings";
import Billing from "./pages/app/settings/Billing";
import NotFound from "./pages/NotFound";

// AI Pages
import AgentConfig from "./pages/app/ai/AgentConfig";
import KnowledgeBase from "./pages/app/ai/KnowledgeBase";
import Prompt from "./pages/app/ai/Prompt";
import AgentIntegrations from "./pages/app/ai/AgentIntegrations";
import AgentTesting from "./pages/app/ai/AgentTesting";

// Reports Pages
import Sales from "./pages/app/reports/Sales";
import Performance from "./pages/app/reports/Performance";
import Custom from "./pages/app/reports/Custom";

// Integrations Pages
import WhatsAppIntegration from "./pages/app/integrations/WhatsApp";
import Email from "./pages/app/integrations/Email";
import Api from "./pages/app/integrations/Api";

// Financial Pages
import Receivables from "./pages/app/financial/Receivables";
import Payables from "./pages/app/financial/Payables";
import Cashflow from "./pages/app/financial/Cashflow";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app/login" element={<Login />} />
          <Route path="/app/register" element={<Register />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="crm/leads" element={<Leads />} />
            <Route path="crm/contacts" element={<Contacts />} />
            <Route path="crm/funnel" element={<Funnel />} />
            <Route path="crm/deals" element={<Deals />} />
            <Route path="crm/history" element={<History />} />
            <Route path="operacional/products" element={<Products />} />
            <Route path="operacional/inventory" element={<Inventory />} />
            <Route path="operacional/purchases" element={<Purchases />} />
            <Route path="operacional/suppliers" element={<Suppliers />} />
            <Route path="pdv/quick-sales" element={<QuickSales />} />
            <Route path="pdv/cashier" element={<Cashier />} />
            <Route path="pdv/payments" element={<Payments />} />
            <Route path="pdv/receipts" element={<Receipts />} />
            <Route path="ai/agent-config" element={<AgentConfig />} />
            <Route path="ai/knowledge-base" element={<KnowledgeBase />} />
            <Route path="ai/prompt" element={<Prompt />} />
            <Route path="ai/integrations" element={<AgentIntegrations />} />
            <Route path="ai/testing" element={<AgentTesting />} />
            <Route path="reports/sales" element={<Sales />} />
            <Route path="reports/performance" element={<Performance />} />
            <Route path="reports/custom" element={<Custom />} />
            <Route path="integrations/whatsapp" element={<WhatsAppIntegration />} />
            <Route path="integrations/email" element={<Email />} />
            <Route path="integrations/api" element={<Api />} />
            <Route path="financial/receivables" element={<Receivables />} />
            <Route path="financial/payables" element={<Payables />} />
            <Route path="financial/cashflow" element={<Cashflow />} />
            <Route path="settings/team" element={<Team />} />
            <Route path="settings/whitelabel" element={<WhiteLabelSettings />} />
            <Route path="settings/billing" element={<Billing />} />
            <Route path="billing" element={<Billing />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
