import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <SignedOut>
        <Outlet /> {/* Renders children (SignIn) if signed out */}
      </SignedOut>
      <SignedIn>
        <Navigate to="/SignInForm" replace /> {/* Redirects to Dashboard if already signed in */}
      </SignedIn>
    </>
  )
}

export default AuthLayout