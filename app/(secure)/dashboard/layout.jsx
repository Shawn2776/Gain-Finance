import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black">
      {children}
    </main>
  );
};

export default AuthLayout;
