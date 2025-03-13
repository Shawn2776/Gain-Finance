import DashTopNav from "@/components/nav/DashTopNav";
import Sidebar from "@/components/nav/Sidebar";

import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <DashTopNav />
      <div className="flex w-full h-full">
        <div className="w-80 border min-h-screen">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
