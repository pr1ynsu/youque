import { createContext, useContext, useState } from "react";

type UIContextType = {
  modalOpen: boolean;
  setModalOpen: (v: boolean) => void;
};

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <UIContext.Provider value={{ modalOpen, setModalOpen }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be inside UIProvider");
  return ctx;
}
