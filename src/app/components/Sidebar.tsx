"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BarChart3, FileText, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
      description: "Analytics & insights",
    },
    {
      name: "Reports",
      href: "/report",
      icon: FileText,
      description: "Financial reports",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-6 left-6 z-50 lg:hidden bg-white shadow-lg border border-[#B09280]/20 text-[#262626] p-3 rounded-xl hover:bg-[#FBFAFA] transition-all duration-200 hover:shadow-xl"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 w-72 h-screen bg-white border-r border-[#B09280]/10 flex flex-col z-50 transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 animate-in shadow-xl lg:shadow-none`}
      >
        {/* Header */}
        <div className="p-8 border-b border-[#B09280]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#698AC5] to-[#B09280] rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#262626]">Analytics</h1>
              <p className="text-sm text-[#B09280]">Dashboard Suite</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`group flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 relative ${
                    isActive
                      ? "bg-[#698AC5] text-white shadow-lg"
                      : "text-[#262626] hover:bg-[#FBFAFA] hover:shadow-sm"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      isActive
                        ? "bg-white/20"
                        : "bg-[#B09280]/10 group-hover:bg-[#698AC5]/10"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base">{item.name}</h3>
                    <p
                      className={`text-sm ${
                        isActive ? "text-white/80" : "text-[#B09280]"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                  {isActive && (
                    <ChevronRight className="w-5 h-5 text-white/60" />
                  )}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#EAE62F] rounded-r-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-[#B09280]/10">
          <div className="flex items-center gap-3 px-4 py-3 bg-[#FBFAFA] rounded-xl">
            <div className="w-2 h-2 bg-[#EAE62F] rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm font-medium text-[#262626]">
                System Status
              </p>
              <p className="text-xs text-[#B09280]">All systems operational</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
