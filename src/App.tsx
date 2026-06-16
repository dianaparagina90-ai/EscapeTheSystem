import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Rooms from "./components/Rooms";
import Victory from "./pages/Victory";
import InventoryProvider from "./context/InventoryContext";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <InventoryProvider>
          <Header />
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
