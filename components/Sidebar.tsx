"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname(); // current route

  const menuItems = [
    { label: "Home", href: "/dashboard" },
    { label: "Customer", href: "/customer" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Project CRM Sample</h2>
      <ul>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li
              key={item.href}
              className={`mb-2 rounded ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              <Link href={item.href} className="block px-3 py-2">
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
