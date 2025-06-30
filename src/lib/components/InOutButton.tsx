import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'


const InOutButton = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default InOutButton