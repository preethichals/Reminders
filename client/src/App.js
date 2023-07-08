import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Portal from '../src/components/Portal';
import Home from '../src/components/Home';
import Register from "./Auth/Register";
import Profile from "../src/components/Profile"
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/portal" element={<Portal />}>
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path='create' element={<CreateNote /> } />
            <Route path='edit/:id' element={<EditNote />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
