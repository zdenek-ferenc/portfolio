"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const DISCORD_ID = "268798740968505353";

export default function StatusBadge() {
    const [status, setStatus] = useState<"loading" | "sleeping" | "coding" | "online">("loading");
    const [activityText, setActivityText] = useState("Načítám status...");

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
                if (DISCORD_ID === "268798740968505353") throw new Error("No ID");

                const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
                const data = await response.json();

                if (data.success && data.data) {
                    const activities = data.data.activities;
                    const vscode = activities.find((act: any) => act.name === "Visual Studio Code");

                    if (vscode) {
                        setStatus("coding");
                        const details = vscode.details || vscode.state || "Visual Studio Code";
                        setActivityText(`Kódím: ${details}`);
                        return;
                    }
                }
            } catch (error) {

            }

            setStatus("online");
            setActivityText("Pracuji na RiseHigh");
        };

        checkStatus();
        const interval = setInterval(checkStatus, 30000);
        return () => clearInterval(interval);
    }, []);

    const getStatusConfig = () => {
        switch (status) {
            case "sleeping":
                return {
                    color: "bg-neutral-500",
                    pulseColor: "bg-neutral-400",
                    text: "text-neutral-400",
                    borderColor: "border-neutral-800"
                };
            case "coding":
                return {
                    color: "bg-blue-500",
                    pulseColor: "bg-blue-400",
                    text: "text-blue-400",
                    borderColor: "border-blue-500/20"
                };
            case "online":
                return {
                    color: "bg-green-500",
                    pulseColor: "bg-green-400",
                    text: "text-neutral-300",
                    borderColor: "border-white/10"
                };
            default:
                return {
                    color: "bg-neutral-500",
                    pulseColor: "bg-neutral-500",
                    text: "text-neutral-500",
                    borderColor: "border-white/5"
                };
        }
    };

    const config = getStatusConfig();

    return (
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border backdrop-blur-md shadow-xl transition-colors duration-500 ${config.borderColor}`}>
            <div className="relative flex h-2 w-2">
                {status !== "sleeping" && (
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.pulseColor}`}></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 transition-colors duration-500 ${config.color}`}></span>
            </div>

            <span className={`text-sm font-medium transition-colors duration-500 ${config.text}`}>
                {status === "loading" ? (
                    <span className="opacity-50">Načítám...</span>
                ) : (
                    activityText
                )}
            </span>
        </div>
    );
}