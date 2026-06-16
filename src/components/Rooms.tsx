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
    <div className="flex flex-col gap-4 w-full p-2">
      <h3 className="text-4xl font-bold font-mono text-indigo-900">
        {room.roomName}
      </h3>
      <div className="flex flex-col justify-center items-center gap-2">
        <img
          className=" object-contain border-b-blue-950 rounded-2xl"
          src={isSolved ? room.solvedImage : room.unsolvedImage}
          alt={isSolved ? room.solvedInstruction : room.unsolvedInstruction}
        />
        <p className="items-center text-center p-2 font-semibold">
          {isSolved ? room.solvedInstruction : room.unsolvedInstruction}
        </p>
      </div>
      <div>
        <div /*className="hintContainer"*/ className="flex gap-4">
          <button
            className="rounded-2xl border-4 border-double text-white bg-indigo-900 p-2 font-bold cursor-pointer hover:text-indigo-900 hover:bg-amber-50"
            onClick={handleHint}
          >
            {hintIsVisible ? "Hide clue" : "Show clue"}
          </button>
          {isSolved && room.itemToAdd === null && (
            <button
              className="rounded-2xl border-4 border-double text-white bg-green-700 p-2 font-bold cursor-pointer hover:text-green-700 hover:bg-emerald-50"
              onClick={handleEscape}
            >
              Escape
            </button>
          )}
          {hintIsVisible && (
            <p className="text-lg text-indigo-950 bg-indigo-200 rounded-2xl p-2 font-semibold font-mono text-center lg:ml-20 ">
              {room.hint}{" "}
            </p>
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
