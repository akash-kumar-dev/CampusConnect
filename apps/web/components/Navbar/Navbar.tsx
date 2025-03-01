import { useState } from "react";
import "./navbar.css";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const AuthButtons = () => {
    if (session && session.user) {
      return (
        <div className="flex items-center space-x-4">
          <Link href="/profile" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
              {session.user.name ? getInitials(session.user.name) : '?'}
            </div>
            <span className="text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white">
              {session.user.name}
            </span>
          </Link>
          <button
            onClick={() => signOut()}
            className="bg-gray-200 text-indigo-800 px-4 py-2 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          >
            Sign Out
          </button>
        </div>
      );
    }

    return (
      <>
        <button
          onClick={() => { window.location.href = '/signup' }}
          className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900"
        >
          Sign Up
        </button>
        <button
          onClick={() => { signIn(); }}
          className="bg-gray-200 text-indigo-800 px-4 py-2 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
        >
          Sign In
        </button>
      </>
    );
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-800 dark:text-white transition-colors duration-300">
          Campus Connect
        </Link>

        {/* Large screen menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/"
            className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white">
            Home
          </Link>
          <Link href="/products"
            className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white">
            Browse
          </Link>
          <Link href="/contact"
            className="nav-link text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white">
            Contact
          </Link>
        </div>

        {/* Large screen buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <AuthButtons />
        </div>

        {/* Toggle button for small screens */}
        <button
          className="md:hidden text-gray-700 dark:text-white focus:outline-none"
          onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Small screen menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <ul className="flex flex-col space-y-4 px-4 py-4">
            <li>
              <Link
                href="/"
                className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white">
                Browse
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white">
                Contact
              </Link>
            </li>
            {session && session.user ? (
              <>
                <li className="py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                      {session.user.name ? getInitials(session.user.name) : '?'}
                    </div>
                    <span className="text-gray-700 dark:text-gray-200">{session.user.name}</span>
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-center bg-gray-200 text-indigo-800 px-4 py-2 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => signIn()}
                    className="w-full text-center bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900"
                  >
                    Sign In
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { window.location.href = '/signup' }}
                    className="w-full text-center bg-gray-200 text-indigo-800 px-4 py-2 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                  >
                    Sign Up
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};
