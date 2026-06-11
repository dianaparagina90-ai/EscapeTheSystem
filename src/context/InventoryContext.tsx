import { createContext, useState, type PropsWithChildren } from "react";
import items from "../data/items.json";
import type { IItem } from "../types.ts";

interface IInventoryContext {
  inventory: IItem[];
  addItem: (id: number) => void;
}

export const InventoryContext = createContext<IInventoryContext | null>(null);

const InventoryProvider = ({ children }: PropsWithChildren) => {
  const startItem = items.find((item) => item.id === 1);

  const [inventory, setInventory] = useState<IItem[]>(
    startItem ? [startItem] : [],
  );

  //Kolla felhanteringen, efter inlagt exist stör map vidare i inventory när man trycker på föregående bild
  const addItem = (id: number) => {
    setInventory((prev) => {
      const newItem = items.find((i) => i.id === id);
      if (!newItem || prev.some((i) => i.id === newItem.id)) {
        return prev;
      }

      return [...prev, newItem];
    });
  };

  return (
    <InventoryContext.Provider value={{ inventory, addItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
