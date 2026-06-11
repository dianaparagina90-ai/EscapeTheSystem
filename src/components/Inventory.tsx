import useInventory from "../hooks/useInventory";
import { useLocation } from "react-router-dom";
import rooms from "../data/rooms.json";
import type { IRoom } from "../types";
const Inventory = () => {
  const { inventory, addItem } = useInventory();
  const location = useLocation();

  const checkIfCorrect = (id: number) => {
    const roomPath = location.pathname.split("/")[1];
    const room = rooms.find((room) => room.roomPath === roomPath);

    if (!room) {
      return;
    }

    if (room.itemToSolve === id) {
      addItem(room.itemToAdd);
    }
  };

  return (
    <div>
      //denna ger felmeddelande när man trycker på tidigare bild
      {inventory.map((i) => (
        <img
          key={i.id}
          src={i.image}
          alt={i.description}
          onClick={() => checkIfCorrect(i.id)}
        />
      ))}
    </div>
  );
};

export default Inventory;
