import { Link } from "react-router-dom";
import rooms from "../data/rooms.json";
import { useState } from "react";

const Navbar = () => {
  const [showRooms, setShowRooms] = useState(false);

  const [shuffledRooms] = useState([...rooms].sort(() => Math.random() - 0.5));

  return (
    <div className="flex gap-4 p-2 justify-center items-center flex-wrap bg-gray-950 text-white">
      <h3
        className="text-xl font-bold cursor-pointer hover:text-emerald-600 hover:scale-110"
        onClick={() => setShowRooms(!showRooms)}
      >
        {showRooms ? "Hide Rooms" : "Rooms"}
      </h3>
      {showRooms && (
        <nav className="flex gap-5 p-2 flex-wrap">
          {shuffledRooms.map((room) => (
            <Link
              className=" hover:font-bold hover:text-emerald-600 hover:scale-110 "
              key={room.id}
              to={room.roomPath}
            >
              {room.roomName}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default Navbar;
