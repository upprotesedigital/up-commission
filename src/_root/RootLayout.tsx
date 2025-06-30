import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { Outlet } from 'react-router-dom';
import SignInForm from '../_auth/forms/SignInForm';

const RootLayout = () => {
  return (
    <>
      <SignedIn>
        <Outlet /> {/* Renders the child route if signed in */}
      </SignedIn>
      <SignedOut>
        {/* Redirects to sign-in if signed out */}
        {/* <RedirectToSignIn />  */}
        <SignInForm />
        {/* Alternatively, you can render a custom sign-in form */}
        {/* <SignInButton /> */}
      </SignedOut>
    </>
  )
}

export default RootLayout