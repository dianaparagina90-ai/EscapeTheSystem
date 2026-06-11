import useInventory from "../hooks/useInventory";
import { useParams, useSearchParams } from "react-router-dom";
import rooms from "../data/rooms.json";

const Rooms = () => {
  const params = useParams();
  const { inventory } = useInventory();
  const [searchParams, setSearchParams] = useSearchParams();

  let hint = false;

  const handleHint = () => {
    if (hint) {
      setSearchParams({
        hint: "true",
      });
    }
    console.log(searchParams);
  };

  const room = rooms.find((room) => room.roomPath === params.roomPath);
  if (!room) {
    return;
  }

  const roomIsSolved = inventory.some((i) => i.id === room.itemToAdd);

  return (
    <div>
      <h3>{room.roomName}</h3>
      <div>
        <img
          src={roomIsSolved ? room.solvedImage : room.unsolvedImage}
          alt={roomIsSolved ? room.solvedInstruction : room.unsolvedInstruction}
        />
        <p>
          {roomIsSolved ? room.solvedInstruction : room.unsolvedInstruction}
        </p>
      </div>
      <button onClick={handleHint}>Tryck</button>
    </div>
  );
};

export default Rooms;

//Man trycker på ett rum - rummets path hamnar i URL
// från location kan man hitta vilket rum man är i
// när man trycker på bild så kollar man : bildens id === rummets item to solve id
//Om det är samma - byt image + instruction
//Då kollar man rummets itemToAdd - id
//Kör addItem(id), hitta nytt item med det id:t,lägg till i inventory-array
