"use client";

interface StatusPillProps {
  text: string;
  variant?: "success" | "warning" | "info";
}

export default function StatusPill({ text, variant = "success" }: StatusPillProps) {
  const config = {
    success: "bg-green-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-neutral-900 border border-white/[0.08] text-[11px] font-medium text-neutral-300">
      <span className={`w-1.5 h-1.5 rounded-full ${config[variant]}`} />
      <span>{text}</span>
    </div>
  );
}
