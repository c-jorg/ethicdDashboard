'use client'
//CURRENTLY THIS IS NOT DOING ANYTHING.  it is my attempt to make it so the sidenav collapses/expands but it didnt work so it is
//not linked anywhere rn
// app/context/menuContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type MenuContextType = {
  isOpen: boolean;
  toggleMenu: () => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <MenuContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
