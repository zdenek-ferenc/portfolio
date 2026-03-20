"use client";

import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";

const DISCORD_ID = "268798740968505353";

interface DiscordActivity {
  name: string;
  details?: string;
  state?: string;
  type: number;
}

interface LanyardData {
  data: {
    activities: DiscordActivity[];
    discord_status: string;
  };
  success: boolean;
}

export default function StatusBadge() {
  const [status, setStatus] = useState<"loading" | "sleeping" | "coding" | "online">("loading");
  const [activityText, setActivityText] = useState("Načítám status...");

  const handleContactClick = () => {
    if (status === "online") {
      const contactSection = document.getElementById("about");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const checkStatus = async () => {
      const now = new Date();
      const hour = now.getHours();

      if (hour >= 1 && hour < 7) {
        setStatus("sleeping");
        setActivityText("😴 Spím (asi)");
        return;
      }

      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const json = (await response.json()) as LanyardData;

        if (json.success && json.data) {
          const activities = json.data.activities;
          const vscode = activities.find((act) => act.name === "Visual Studio Code");

          if (vscode) {
            setStatus("coding");
            let repo = vscode.state || "Repo";
            let file = vscode.details || "Code";
            repo = repo.replace("Workspace: ", "");
            file = file.replace("Editing ", "").replace("Working on ", "");
            setActivityText(`Pracuju: ${repo}/${file}`);
            return;
          }
        }
      } catch (error) {
        console.error("Chyba při načítání Lanyard statusu:", error);
      }

      setStatus("online");
      setActivityText("Zrovna nekódím, napiš mi");
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case "sleeping": return "bg-neutral-500";
      case "coding": return "bg-blue-500";
      case "online": return "bg-green-500";
      default: return "bg-neutral-500";
    }
  };

  return (
    <div
      onClick={handleContactClick}
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-neutral-900 
        backdrop-blur-sm text-[11px] font-medium text-neutral-300 transition-all duration-300
        ${status === "online" ? "cursor-pointer hover:bg-neutral-800 hover:border-white/10" : "cursor-default"}
      `}
    >
      <div className="relative flex items-center justify-center w-2 h-2">
        {status !== "loading" && status !== "sleeping" && (
          <span className="absolute inset-0 rounded-full bg-current opacity-20 filter blur-[2px] animate-pulse" 
                style={{ color: status === "coding" ? "rgb(59, 130, 246)" : "rgb(34, 197, 94)" }} />
        )}
        <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor()}`} />
      </div>

      <span className="flex items-center gap-1.5">
        {status === "loading" ? "Načítám..." : activityText}
        {status === "online" && <ArrowDown className="w-3 h-3 text-neutral-500 animate-bounce" />}
      </span>
    </div>
  );
}