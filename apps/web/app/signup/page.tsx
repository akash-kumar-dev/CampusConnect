"use client";

import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import Signup from "../../components/Signup";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto my-16 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Create an Account
        </h1>
        <Signup />
      </div>
      <Footer />
    </div>
  );
}
