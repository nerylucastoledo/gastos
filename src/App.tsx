import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { CreateAccount } from "./pages/CreteAccount/CreateAccount";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";
import { Profile } from "./pages/Profile";
import { DataContextProvider } from "./Context/DataContext";

function App() {

  return (
    <BrowserRouter>
      <DataContextProvider>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/create-account" element={<CreateAccount />}/>
          <Route path="/reset-password" element={<ResetPassword />}/>
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </DataContextProvider>
    </BrowserRouter>
  )
}

export default App
