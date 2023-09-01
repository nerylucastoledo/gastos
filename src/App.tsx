import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { CreateAccount } from "./pages/CreteAccount/CreateAccount";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";
import { Profile } from "./pages/Profile";
import { DataByFilterContextProvider } from "./Context/DataByFilters";

function App() {

  return (
    <BrowserRouter>
      <DataByFilterContextProvider>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/create-account" element={<CreateAccount />}/>
          <Route path="/reset-password" element={<ResetPassword />}/>
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </DataByFilterContextProvider>
    </BrowserRouter>
  )
}

export default App
