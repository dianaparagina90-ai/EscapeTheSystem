import useInventory from "../hooks/useInventory";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import rooms from "../data/rooms.json";
import Inventory from "./Inventory";

const Rooms = () => {
  const { roomPath } = useParams();
  const { inventory, checkIfCorrect, resetInventory } = useInventory();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [exitSolved, setExitSolved] = useState(false);

  const hintIsVisible = searchParams.get("hint") === "true";

  const handleHint = () => {
    setSearchParams({ hint: (!hintIsVisible).toString() });
  };

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

  const handleEscape = () => {
    resetInventory();
    navigate("/victory");
  };

  const isSolved = room.itemToAdd === null ? exitSolved : roomIsSolved;

  return (
    <div className="room">
      <h3>{room.roomName}</h3>
      <div className="imageAndInstruction">
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
            <button onClick={handleEscape}>Escape</button>
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
