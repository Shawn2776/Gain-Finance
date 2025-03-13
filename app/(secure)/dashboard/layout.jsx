import DashTopNav from "@/components/nav/DashTopNav";
import Sidebar from "@/components/nav/Sidebar";

import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <main className="flex flex-col w-full min-h-screen text-black">
      <DashTopNav />
      <div className="flex w-full h-full">
        <div className="w-80 border-r min-h-screen">
          <Sidebar />
        </div>
        <div className="bg-white w-full h-full pl-2 pt-2">{children}</div>
      </div>
    </main>
  );
};

export default AuthLayout;
