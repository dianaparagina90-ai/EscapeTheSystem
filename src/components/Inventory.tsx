import useInventory from "../hooks/useInventory";
import { useParams } from "react-router-dom";
import rooms from "../data/rooms.json";
import type { IRoom } from "../types";

interface IProps {
  onItemClick: (itemId: number) => void;
}

const Inventory = ({ onItemClick }: IProps) => {
  const { inventory } = useInventory();

  // console.log(roomPath);

  // const room: IRoom | undefined = rooms.find(
  //   (room) => room.roomPath === roomPath,
  // );

  // const checkIfCorrect = (id: number) => {
  //   const roomPath = location.pathname.split("/")[1];
  //   const room: IRoom | undefined = rooms.find(
  //     (room) => room.roomPath === roomPath,
  //   );

  //   if (!room) {
  //     return;
  //   }

  //   if (room.itemToSolve === id) {
  //     const itemToAdd = room.itemToAdd;
  //     if (typeof itemToAdd === "number") {
  //       addItem(itemToAdd);
  //     }
  //     // navigera vidare till victory när man trycker på sista bilden
  //     else if (room.itemToAdd === null) {
  //       navigate("/victory");
  //     }
  //   }
  // };

  return (
    <div>
      {inventory.map((i) => (
        <img
          key={i.id}
          src={i.image}
          alt={i.description}
          onClick={() => onItemClick(i.id)}
        />
      ))}
    </div>
  );
};

export default Inventory;
