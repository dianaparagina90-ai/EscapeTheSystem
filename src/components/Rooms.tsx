import useInventory from "../hooks/useInventory";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import rooms from "../data/rooms.json";
import Inventory from "./Inventory";

const Rooms = () => {
  const { roomPath } = useParams();
  const { inventory, checkIfCorrect } = useInventory();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [exitSolved, setExitSolved] = useState(false);

  const hintIsVisible = searchParams.get("hint") === "true";

  const handleHint = () => {
    setSearchParams({ hint: (!hintIsVisible).toString() });
  };
  // console.log(searchParams);

  const room = rooms.find((room) => room.roomPath === roomPath);
  if (!room) {
    return;
  }

  const roomIsSolved = inventory.some((i) => i.id === room.itemToAdd);

  const handleClick = (itemId: number) => {
    const solved = checkIfCorrect(room, itemId);
    if (solved && room.itemToAdd === null) {
      setExitSolved(true);
    }
  };

  const isSolved = room.itemToAdd === null ? exitSolved : roomIsSolved;

  return (
    <div>
      <h3>{room.roomName}</h3>
      <div>
        <img
          src={isSolved ? room.solvedImage : room.unsolvedImage}
          alt={isSolved ? room.solvedInstruction : room.unsolvedInstruction}
        />
        <p>{isSolved ? room.solvedInstruction : room.unsolvedInstruction}</p>
      </div>
      <div>
        <div>
          <button onClick={handleHint}>
            {hintIsVisible ? "Hide clue" : "Show clue"}
          </button>
          {hintIsVisible && <p>{room.hint} </p>}
          {isSolved && room.itemToAdd === null && (
            <button onClick={() => navigate("/victory")}>Escape</button>
          )}
        </div>
      </div>
      <Inventory onItemClick={handleClick} />
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
