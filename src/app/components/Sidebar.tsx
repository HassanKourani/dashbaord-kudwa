"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Main Dashboard",
      href: "/dashboard",
      icon: "📊",
    },
    {
      name: "Report",
      href: "/report",
      icon: "📋",
    },
  ];

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-[#262626] text-[#FBFAFA] flex flex-col z-50">
      <div className="p-6 border-b border-[#B09280]/20">
        <h1 className="text-xl font-bold text-[#EAE62F]">Dashboard</h1>
        <p className="text-sm text-[#B09280] mt-1">Analytics & Reports</p>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-[#B09280]/10 ${
                    isActive
                      ? "bg-[#698AC5] text-white shadow-lg"
                      : "text-[#FBFAFA] hover:text-[#EAE62F]"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-[#B09280]/20">
        <div className="text-xs text-[#B09280]">
          <p>© 2024 Dashboard</p>
          <p>Version 1.0</p>
        </div>
      </div>
    </div>
  );
}
