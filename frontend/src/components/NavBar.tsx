import React from 'react';
import { Button } from "@/components/ui/button";
import logo from '../assets/hero.webp'; // Using hero image as a placeholder logo

const NavBar: React.FC = () => {
  const isAuthenticated = false; // Placeholder for authentication state

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4">
        
        {/* Left Section: Logo and App Name */}
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="MemoryLock Logo" 
              className="h-12 w-12 flex-shrink-0 rounded-md object-cover" 
            />
            <span className="font-bold text-xl hidden md:block">MemoryLock</span>
          </a>
        </div>

        {/* Center Section: Can be used for nav links later */}
        <div className="flex-1">
          {/* Intentionally empty for now */}
        </div>

        {/* Right Section: Auth Buttons */}
        <div className="flex items-center justify-end gap-2">
          {isAuthenticated ? (
            <Button variant="outline">Logout</Button>
          ) : (
            <>
              <Button variant="ghost">Login</Button>
              <Button>Sign Up</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
