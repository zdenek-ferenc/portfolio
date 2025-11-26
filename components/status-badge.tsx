"use client";

import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";

const DISCORD_ID = "268798740968505353"; 

interface DiscordActivity {
  name: string;
  details?: string;
  state?: string;
  type: number;
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
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

  const getStatusConfig = () => {
    switch (status) {
      case "sleeping":
        return {
          wrapper: "bg-neutral-500/10 border-neutral-800 cursor-default",
          dot: "bg-neutral-500",
          pulse: "", 
          text: "text-neutral-400",
        };
      case "coding":
        return {
          wrapper: "bg-blue-500/10 border-blue-500/20 cursor-default",
          dot: "bg-blue-500",
          pulse: "bg-blue-400",
          text: "text-blue-400",
        };
      case "online":
        return {
          wrapper: "bg-green-500/10 border-green-500/20 hover:bg-green-500/20 cursor-pointer group",
          dot: "bg-green-500",
          pulse: "bg-green-400",
          text: "text-green-400 group-hover:text-green-300",
        };
      default:
        return {
          wrapper: "bg-white/5 border-white/5",
          dot: "bg-neutral-500",
          pulse: "bg-neutral-500",
          text: "text-neutral-500",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div 
      onClick={handleContactClick}
      className={`
        inline-flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-md shadow-xl 
        transition-all duration-300 ${config.wrapper}
      `}
    >
      <div className="relative flex h-2 w-2">
        {config.pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.pulse}`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 transition-colors duration-500 ${config.dot}`}></span>
      </div>
      
      <span className={`text-sm font-medium transition-colors duration-500 flex items-center gap-2 ${config.text}`}>
        {status === "loading" ? (
           <span className="opacity-50">Načítám...</span>
        ) : (
          <>
            {activityText}
            {status === "online" && (
              <ArrowDown className="w-3 h-3 animate-bounce" />
            )}
          </>
        )}
      </span>
    </div>
  );
}