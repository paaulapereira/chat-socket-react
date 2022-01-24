import { BrowserRouter, Routes, Route } from "react-router-dom";
//importando componentes
import Login from "./components/Login";
import Chat from "./components/Chat";
//importando estilos
import "./sass/main.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
