"use client";

import Sidebar from "./Sidebar";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Layout({ children }: { children: ReactNode }) {
  const { userEmail } = useAuth();
  const topNavItems = [
    {
      label: userEmail,
      href: "#",
      submenu: [
        { label: "View Profile", href: "/profile" },
        { label: "Edit Profile", href: "/profile/edit" },
        { label: "Settings", href: "/settings" },
        { label: "Logout", href: "/logout" },
      ],
    },
  ];

  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - hidden on small screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar Modal for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* Sidebar Panel */}
          <div className="relative w-64 bg-gray-800 text-white p-4">
            <button
              className="mb-4 text-white font-bold"
              onClick={() => setSidebarOpen(false)}
            >
              Close
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Top Bar */}
        <header className="flex md:hidden bg-gray-900 text-white px-4 py-3 items-center justify-between shadow">
          {/* Hamburger button */}
          <button
            className="text-2xl font-bold"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          {/* Optional top actions */}
          <div className="flex space-x-4">
            {topNavItems.map(
              (item, index) =>
                !item.submenu && (
                  <Link
                    key={index}
                    href={item.href}
                    className="hover:text-blue-400 px-2 py-1"
                  >
                    {item.label}
                  </Link>
                ),
            )}
          </div>
        </header>

        {/* Top Navigation - only visible on md and above */}
        <header className="hidden md:flex bg-gray-900 text-white px-6 py-3 justify-end space-x-4 shadow">
          {topNavItems.map((item) => (
            <div key={item.label} className="relative group">
              <Link href={item.href} className="hover:text-blue-400 px-2 py-1">
                {item.label}
              </Link>

              {/* Dropdown Menu */}
              {item.submenu && (
                <ul className="absolute right-0 mt-2 w-40 bg-white text-gray-900 rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                  {item.submenu.map((subItem) => (
                    <li key={subItem.href} className="hover:bg-gray-200">
                      <Link href={subItem.href} className="block px-4 py-2">
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
