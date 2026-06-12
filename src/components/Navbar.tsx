import { Link } from "react-router-dom";
import rooms from "../data/rooms.json";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <nav className="roomNavigation">
        {rooms.map((room) => (
          <Link key={room.id} to={room.roomPath}>
            {room.roomName}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
