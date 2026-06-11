import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Search, Settings, HelpCircle, Bell, ChevronDown } from "lucide-react";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top nav */}
      <header className="border-b border-ds-border bg-white sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-6 flex items-center h-14 gap-8">
          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex items-center gap-2 shrink-0">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="4" fill="#130032"/>
              <path d="M8 14c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z" fill="#4C00FF"/>
              <path d="M11 14c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3z" fill="white"/>
            </svg>
            <span className="font-semibold text-inkwell text-lg tracking-tight">docusign</span>
          </button>

          {/* Nav links */}
          <nav className="flex items-center gap-1">
            {[
              { to: "/", label: "Home" },
              { to: "/agreements", label: "Agreements" },
              { to: "/templates", label: "Templates" },
              { to: "/workspace", label: "Workspaces" },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `px-4 py-4 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? "border-cobalt text-cobalt"
                      : "border-transparent text-gray-600 hover:text-inkwell"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                className="pl-9 pr-4 py-1.5 text-sm border border-ds-border rounded-full bg-ds-gray focus:outline-none focus:border-cobalt w-52"
                placeholder="Search"
              />
            </div>
            <button className="p-2 rounded-full hover:bg-ds-gray text-gray-500"><Settings size={18} /></button>
            <button className="p-2 rounded-full hover:bg-ds-gray text-gray-500"><Bell size={18} /></button>
            <button className="p-2 rounded-full hover:bg-ds-gray text-gray-500"><HelpCircle size={18} /></button>
            <button className="w-8 h-8 rounded-full bg-cobalt text-white text-sm font-semibold flex items-center justify-center">
              AS
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-ds-border text-xs text-gray-400 py-4 px-6 flex gap-6">
        <span>English (US)</span>
        {["Contact Us", "Terms of Use", "Privacy", "Intellectual Property", "Trust"].map(t => (
          <a key={t} href="#" className="hover:underline">{t}</a>
        ))}
        <span className="ml-auto">Copyright © 2026 Docusign, Inc. All rights reserved</span>
      </footer>
    </div>
  );
}
