import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const TopNav = () => {
  return (
    <header className="navbar px-5 mx-auto flex justify-between w-full items-center py-1 shadow-md">
      <div className="navbar-start">
        <Link href="/dashboard" className="flex text-orange-300">
          {" "}
          <span className="text-2xl border mr-2 ">
            <Image src="/logo.png" height={120} width={120} alt="logo" />{" "}
          </span>{" "}
          <span className="text-3xl font-extrabold">Gain Finance</span>
        </Link>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end">
        <SignedOut>
          <div className="flex gap-5 font-bold">
            <SignInButton />
            <SignUpButton />
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default TopNav;
