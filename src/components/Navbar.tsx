import { Link } from "react-router-dom";
import rooms from "../data/rooms.json";
import { useState } from "react";

const Navbar = () => {
  const [showRooms, setShowRooms] = useState(false);

  return (
    <div
      className=" flex flex-col gap-4 p-4 bg-gray-950 text-white
      w-full"
    >
      <header className=" relative flex items-center">
        <Link
          to="/"
          className="font-bold hover:text-emerald-600 hover:scale-110 hover:italic"
        >
          Home
        </Link>
        <h1 className="absolute left-2/5 text-4xl font-bold italic">
          Escape the System
        </h1>
      </header>
      <div className="flex gap-4 p-2 justify-center items-center">
        <h3
          className="text-xl font-bold cursor-pointer hover:text-emerald-600 hover:scale-110 hover:italic"
          onClick={() => setShowRooms(!showRooms)}
        >
          {showRooms ? "Hide Rooms" : "Rooms"}
        </h3>
        {showRooms && (
          <nav className="flex ml-7">
            {rooms.map((room) => (
              <Link
                className="flex gap-5 p-2 hover:italic hover:font-bold hover:text-emerald-600 hover:scale-110 "
                key={room.id}
                to={room.roomPath}
              >
                {room.roomName}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
};

export default Navbar;
