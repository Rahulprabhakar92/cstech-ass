import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 ">
      <h1 className="text-4xl font-bold mb-6">Welcome </h1>
      <p className="text-lg text-gray-600 mb-8">Signup or Signin.</p>
      <div className="flex space-x-4">
        <Link href={'/signin'}>
        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition" 
        >
          Sign In
        </button>
        </Link>
        <Link href={'/signup'}>
        <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
          Sign Up
        </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;