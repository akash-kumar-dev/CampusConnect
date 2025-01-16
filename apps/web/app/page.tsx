"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Navbar } from "../components/Navbar/Navbar";

export default function Home() {
  const session = useSession();

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold underline mb-6">Hello world!</h1>
      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        current session: {JSON.stringify(session)}
      </div>
      <div className="space-x-4">
        <button
          onClick={() => {
            signIn();
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          SignIn
        </button>
        <button
          onClick={() => {
            signOut();
          }}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          SignOut
        </button>
              <button
                onClick={() => {
                  window.location.href = '/signup'
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Signup
              </button>
      </div>
    </div>
    </div>
  );
}
