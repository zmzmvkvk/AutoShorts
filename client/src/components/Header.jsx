import React from "react";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function Header() {
  const { pathname } = useLocation();

  const navItem = (path, label) => (
    <Link
      to={path}
      className={twMerge(
        "text-sm md:text-base px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition",
        pathname === path ? "bg-orange-600 text-white" : "text-orange-300"
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1a2f2e] border-b border-orange-400 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-lg md:text-xl font-bold text-orange-400">
          🚗🔥
        </Link>
        <nav className="space-x-2">
          {navItem("/", "홈")}
          {navItem("/dashboard", "대시보드")}
        </nav>
      </div>
    </header>
  );
}
