import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login";
import { CreateAccount } from "./pages/CreateAccount";
import { ResetPassword } from "./pages/ResetPassword";
import { Profile } from "./pages/Profile";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/create-account" element={<CreateAccount />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
