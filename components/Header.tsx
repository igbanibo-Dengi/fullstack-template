import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between gap-5 border-b px-6 py-6">
      <Link href="/" className="text-xl font-bold">
        Home
      </Link>

      <ul className="flex flex-row gap-5">
        <li>
          <Link href="/about" className="text-xl font-bold">
            About
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
