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
        setActivityText("Spím (asi)");
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

  const dotColor = status === "coding" || status === "online" ? "bg-emerald-500" : "bg-neutral-600";

  return (
    <div
      onClick={handleContactClick}
      className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] font-mono text-xs text-neutral-300 transition-colors duration-300 ${
        status === "online" ? "cursor-pointer hover:bg-white/[0.05] hover:border-white/[0.14]" : "cursor-default"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span className="flex items-center gap-1.5">
        {status === "loading" ? "Načítám..." : activityText}
        {status === "online" && <ArrowDown className="w-3 h-3 text-neutral-500" />}
      </span>
    </div>
  );
}
