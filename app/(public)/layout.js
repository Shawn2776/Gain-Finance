import TopNav from "@/components/nav/TopNav";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <TopNav />
      {children}
    </div>
  );
};

export default layout;
