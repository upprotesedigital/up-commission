import { Route, Routes } from "react-router-dom"
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout"
import Dashboard from "./_root/pages/Dashboard"
import SignInForm from "./_auth/forms/SignInForm"


const App = () => {
  return (
    <Routes>
      
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/SignInForm" element={<SignInForm />} />
      </Route>

      {/* Protected Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Dashboard />} />
        </Route>   
    </Routes>
  )
}

export default App