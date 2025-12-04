import { Layout, LogOut, Plus } from "lucide-react";
import { DevLogPost } from "./types";

interface AdminSidebarProps {
    posts: DevLogPost[];
    selectedPostId: string | null;
    onSelectPost: (post: DevLogPost) => void;
    onNewPost: () => void;
    onSignOut: () => void;
}

export default function AdminSidebar({ posts, selectedPostId, onSelectPost, onNewPost, onSignOut }: AdminSidebarProps) {
    return (
        <aside className="w-full md:w-80 border-r border-white/5 bg-neutral-900/30 flex flex-col h-[300px] md:h-screen">
            <div className="p-4 border-b border-white/5 flex justify-between bg-neutral-900/50">
                <h2 className="font-bold text-white flex items-center gap-2"><Layout className="w-4 h-4 text-accent" /> DevLog</h2>
                <div className="flex gap-2">
                    <button onClick={onNewPost} className="p-2 hover:bg-white/10 rounded cursor-pointer text-neutral-400 hover:text-white"><Plus className="w-4 h-4" /></button>
                    <button onClick={onSignOut} className="p-2 hover:bg-white/10 rounded cursor-pointer text-neutral-400 hover:text-red-500"><LogOut className="w-4 h-4" /></button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                {posts.map(post => (
                    <div key={post.id} onClick={() => onSelectPost(post)} className={`p-3 rounded-lg cursor-pointer border ${selectedPostId === post.id ? "bg-white/5 border-accent/50" : "border-transparent hover:bg-white/5"}`}>
                        <h3 className="font-medium text-sm text-white truncate">{post.title}</h3>
                        <div className="flex justify-between items-center mt-1 text-xs text-neutral-500">
                            <span>{post.date}</span><span className="bg-white/5 px-1.5 py-0.5 rounded">{post.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}
