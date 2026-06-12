import { createContext, useState, type PropsWithChildren } from "react";
import items from "../data/items.json";
import rooms from "../data/rooms.json";
import type { IItem, IRoom } from "../types.ts";
import { useParams } from "react-router-dom";

interface IInventoryContext {
  inventory: IItem[];
  checkIfCorrect: (room: IRoom, id: number) => boolean;
  resetInventory: () => void;
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

  const checkIfCorrect = (room: IRoom, id: number) => {
    if (room.itemToSolve !== id) {
      return false;
    }
    if (typeof room.itemToAdd === "number") {
      addItem(room.itemToAdd);
    }
    return true;
  };

  const resetInventory = () => {
    setInventory(startItem ? [startItem] : []);
  };

  return (
    <InventoryContext.Provider
      value={{ inventory, checkIfCorrect, resetInventory }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
