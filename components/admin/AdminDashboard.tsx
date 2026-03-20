"use client";

import { useState } from "react";
import { Terminal, Database, ShieldAlert, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import DevLogManager from "@/components/admin/DevLogManager";
import SkillsManager from "@/components/admin/SkillsManager";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"devlog" | "skills">("devlog");

  return (
    <div className="min-h-screen bg-background text-neutral-200 flex flex-col h-screen overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-14 border-b border-white/[0.04] bg-neutral-950/80 backdrop-blur-md px-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-accent" />
            <span className="font-bold text-sm text-white tracking-wide">Admin</span>
          </div>
          
          <nav className="flex gap-1 h-full">
            <button
              onClick={() => setActiveTab("devlog")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "devlog"
                  ? "bg-white/[0.05] text-white"
                  : "text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              DevLog
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "skills"
                  ? "bg-white/[0.05] text-white"
                  : "text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Skills
            </button>
          </nav>
        </div>

        <button
          onClick={() => signOut(auth)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-500 hover:text-red-500 hover:bg-red-500/[0.06] transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Odhlásit
        </button>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === "devlog" ? <DevLogManager /> : <SkillsManager />}
      </div>
    </div>
  );
}
