import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { CreateAccount } from "./pages/CreteAccount/CreateAccount";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";
import { Profile } from "./pages/Profile/Profile";
import { DataByFilterContextProvider } from "./Context/DataByFilters";
import ProtectedRoute from "./utils/PrivateRoute";
import { NewBill } from "./pages/NewBIll/NewBill";
import { Invoice } from "./pages/Invoice/Invoice";
import { useTheme } from "./Context/ThemeContext";
import { Report } from "./pages/Report/Report";

function App() {
  const { theme} = useTheme()


  return (
    <BrowserRouter>
      <div className="app" data-theme={theme}>
        <DataByFilterContextProvider>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }/>
            <Route path="/login" element={<Login />}/>
            <Route path="/create-account" element={<CreateAccount />}/>
            <Route path="/reset-password" element={<ResetPassword />}/>
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }/>
            <Route path="/invoice/:name_card" element={
              <ProtectedRoute>
                <Invoice />
              </ProtectedRoute>
            }/>
            <Route path="/new-bill" element={
              <ProtectedRoute>
                <NewBill />
              </ProtectedRoute>
            }/>
            <Route path="/report" element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }/>
          </Routes>
        </DataByFilterContextProvider>
      </div>
    </BrowserRouter>
  )
}

export default App
