"use client"
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { ModeToggle } from './ModeToggle';

const Nav = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="py-2">
      <div className="container mx-auto">
      <div className='flex justify-between items-center'>
      <ModeToggle />
        {isSignedIn ? (
          // Show UserButton when signed in
          <UserButton />
        ) : (
          // Show SignInButton when signed out
          <SignInButton />
        )}
      </div>
      </div>
    </nav>
  );
};

export default Nav;
