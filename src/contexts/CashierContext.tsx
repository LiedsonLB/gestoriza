import { createContext, useContext, useState, ReactNode } from 'react';

interface CashierContextType {
  isOpen: boolean;
  openCashier: (initialValue?: number) => void;
  closeCashier: () => void;
  initialBalance: number;
}

const CashierContext = createContext<CashierContextType | undefined>(undefined);

export const CashierProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialBalance, setInitialBalance] = useState(0);

  const openCashier = (initialValue: number = 0) => {
    setInitialBalance(initialValue);
    setIsOpen(true);
  };

  const closeCashier = () => {
    setIsOpen(false);
    setInitialBalance(0);
  };

  return (
    <CashierContext.Provider value={{ isOpen, openCashier, closeCashier, initialBalance }}>
      {children}
    </CashierContext.Provider>
  );
};

export const useCashier = () => {
  const context = useContext(CashierContext);
  if (!context) {
    throw new Error('useCashier must be used within a CashierProvider');
  }
  return context;
};
