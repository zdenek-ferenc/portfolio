import { Edit3, Eye, Loader2, Save, Trash2 } from "lucide-react";

interface EditorHeaderProps {
    title: string;
    setTitle: (v: string) => void;
    isSaving: boolean;
    onSave: () => void;
    onDelete: () => void;
    isPreview: boolean;
    setIsPreview: (v: boolean) => void;
    hasSelectedPost: boolean;
    setSlug: (v: string) => void;
}

export default function EditorHeader({
    title, setTitle, isSaving, onSave, onDelete,
    isPreview, setIsPreview, hasSelectedPost, setSlug
}: EditorHeaderProps) {
    return (
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-neutral-900/30 backdrop-blur-md z-20">
            <input
                value={title}
                onChange={e => {
                    setTitle(e.target.value);
                    if (!hasSelectedPost) {
                        setSlug(e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
                    }
                }}
                placeholder="Název příspěvku..."
                className="bg-transparent text-xl font-bold text-white placeholder:text-neutral-600 focus:outline-none w-full max-w-2xl"
            />
            <div className="flex items-center gap-3">
                <button onClick={() => setIsPreview(!isPreview)} className="md:hidden p-2 hover:bg-white/5 rounded cursor-pointer text-neutral-400">{isPreview ? <Edit3 className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                {hasSelectedPost && <button onClick={onDelete} className="p-2 hover:bg-red-500/10 cursor-pointer text-neutral-500 hover:text-red-500 rounded"><Trash2 className="w-5 h-5" /></button>}
                <button onClick={onSave} disabled={isSaving} className="flex items-center gap-2 bg-accent/80 hover:bg-accent transition-all ease-in-out duration-200 cursor-pointer text-white px-4 py-2 rounded font-medium text-sm disabled:opacity-50">
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> {hasSelectedPost ? "Upravit" : "Publikovat"}</>}
                </button>
            </div>
        </header>
    );
}
