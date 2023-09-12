import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const username = window.localStorage.getItem('username')

  if (username === null) {
    return <Navigate to="/login" replace />
  }

  return children;
}

export default ProtectedRoute