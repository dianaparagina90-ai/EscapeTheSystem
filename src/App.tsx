import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Rooms from "./components/Rooms";
import Victory from "./pages/Victory";
import Navbar from "./components/Navbar";
import InventoryProvider from "./context/InventoryContext";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <InventoryProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:roomPath" element={<Rooms />} />
            <Route path="/victory" element={<Victory />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </InventoryProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
