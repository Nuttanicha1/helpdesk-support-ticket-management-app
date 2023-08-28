import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage.js";
import Register from "./pages/auth/Register.js";
import Login from "./pages/auth/Login.js";
import CreateTicket from "./pages/user/CreateTicket.js";
import TicketList from "./pages/user/TicketList.js";
import EditTicket from "./pages/user/EditTicket.js";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-ticket" element={<CreateTicket />} />
        <Route path="/ticket" element={<TicketList />} />
        <Route path="/ticket-edit/:slug" element={<EditTicket />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
