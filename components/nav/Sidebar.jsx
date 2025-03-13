"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { PiDotsNineBold } from "react-icons/pi";
import { MdOutlineChevronRight } from "react-icons/md";

const sidebarItems = [
  {
    id: 1,
    title: "Dashboard",
    link: "/dashboard",
    icon: {
      title: "Dashboard",
      ico: PiDotsNineBold,
    },
  },
  {
    id: 2,
    title: "Transactions",
    link: "/dashboard/transactions",
    icon: {
      title: "Transactions",
      ico: HiOutlineCurrencyDollar,
    },
  },
];

function getFinalSegment(str) {
  const parts = str.split("/"); // Split the string by "/"
  const lastPart = parts.pop(); // Get the last segment
  return lastPart.charAt(0).toUpperCase() + lastPart.slice(1); // Capitalize first letter
}

const Sidebar = () => {
  const pathname = usePathname();
  const path = getFinalSegment(pathname);

  return (
    <div className="w-full bg-gray-100 h-full flex flex-col">
      {sidebarItems.map((item) => (
        <Link
          href={item.link}
          key={item.id}
          className={`${
            pathname === item.link
              ? "bg-gray-200 text-blue-500"
              : "hover:bg-gray-300 hover:text-orange-500 transition duration-200"
          } group flex items-center justify-between p-2 border-b border-blue-500/30 `}
        >
          {/* Left side: Icon and text */}
          <div className="flex items-center gap-2">
            {item.icon.ico && <item.icon.ico className="w-5 h-5" />}
            {item.title}
          </div>

          {/* Right side: Arrow (hidden by default, shown on hover) */}
          <span
            className={`${
              pathname === item.link ? "text-blue-500 opacity-100" : ""
            } opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-blue-500`}
          >
            <MdOutlineChevronRight />
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
