import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header
      className="  flex flex-col gap-4 p-4 bg-gray-950 text-white
      w-full"
    >
      <h1 className="text-center left-2/5 lg:text-4xl font-bold sm:text-2xl font-mono">
        Escape the System
      </h1>
      <div className="w-full flex items-center justify-between flex-wrap gap-2">
        <Link
          to="/"
          className=" font-bold hover:text-emerald-600 hover:scale-110 border-amber-50 border p-2 rounded-md"
        >
          Home
        </Link>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
