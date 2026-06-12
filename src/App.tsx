import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Rooms from "./components/Rooms";
import Victory from "./pages/Victory";
import Navbar from "./components/Navbar";
import Inventory from "./components/Inventory";
import InventoryProvider from "./context/InventoryContext";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <InventoryProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}>
              Home
            </Route>
            <Route path="/:roomPath" element={<Rooms />}>
              Rooms
            </Route>
            <Route path="/victory" element={<Victory />}>
              Victory
            </Route>
            <Route path="*" element={<Navigate to="/" replace />}>
              {" "}
              Home{" "}
            </Route>
          </Routes>
        </InventoryProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
