import { Link } from "react-router-dom";
import rooms from "../data/rooms.json";

const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>

      <nav style={{ display: "flex", gap: "20px" }}>
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
