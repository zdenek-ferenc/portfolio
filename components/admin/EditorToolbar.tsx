import {
    Bold, Italic, Code, Link as LinkIcon, List,
    Image as ImageIcon, Palette, Loader2,
    Heading1, Heading2, Heading3
} from "lucide-react";
import { useState, useRef } from "react";

interface EditorToolbarProps {
    category: string;
    setCategory: (v: string) => void;
    onInsertText: (prefix: string, suffix?: string) => void;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isUploading: boolean;
}

export default function EditorToolbar({ category, setCategory, onInsertText, onImageUpload, isUploading }: EditorToolbarProps) {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const insertColor = (colorVar: string) => {
        onInsertText(`<span style="color: var(${colorVar})">`, "</span>");
        setShowColorPicker(false);
    };

    return (
        <div className="px-4 py-2 border-b border-white/5 bg-neutral-900/20 flex flex-wrap gap-2 items-center select-none overflow-x-auto">
            <select value={category} onChange={e => setCategory(e.target.value)} className="bg-white cursor-pointer border border-white/10 rounded px-2 py-1 text-xs text-black outline-none focus:border-accent">
                {["Feature", "Design", "Backend", "Bugfix", "Learning"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <div className="w-px h-4 bg-white/10 mx-2" />

            {/* Typography */}
            <div className="flex gap-1">
                <ToolBtn icon={<Heading1 className="w-4 h-4" />} onClick={() => onInsertText('# ')} tip="Velký nadpis" />
                <ToolBtn icon={<Heading2 className="w-4 h-4" />} onClick={() => onInsertText('## ')} tip="Střední nadpis" />
                <ToolBtn icon={<Heading3 className="w-4 h-4" />} onClick={() => onInsertText('### ')} tip="Malý nadpis" />
            </div>

            <div className="w-px h-4 bg-white/10 mx-2" />

            {/* Formatting */}
            <div className="flex gap-1">
                <ToolBtn icon={<Bold className="w-3 h-3" />} onClick={() => onInsertText('**', '**')} tip="Tučně" />
                <ToolBtn icon={<Italic className="w-3 h-3" />} onClick={() => onInsertText('*', '*')} tip="Kurzíva" />
                <ToolBtn icon={<Code className="w-3 h-3" />} onClick={() => onInsertText('`', '`')} tip="Kód" />
                <ToolBtn icon={<List className="w-3 h-3" />} onClick={() => onInsertText('\n- ')} tip="Seznam" />
                <ToolBtn icon={<LinkIcon className="w-3 h-3" />} onClick={() => onInsertText('[', '](url)')} tip="Odkaz" />
            </div>

            <div className="w-px h-4 bg-white/10 mx-2" />

            {/* Media & Color */}
            <button onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="p-1.5 hover:bg-white/10 rounded text-neutral-400 hover:text-white transition-colors relative" title="Nahrát obrázek">
                {isUploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <ImageIcon className="w-3 h-3" />}
            </button>
            <input type="file" ref={fileInputRef} onChange={onImageUpload} className="hidden" accept="image/*" />

            <div className="relative">
                <button onClick={() => setShowColorPicker(!showColorPicker)} className={`p-1.5 rounded transition-colors ${showColorPicker ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white hover:bg-white/10'}`} title="Barva textu">
                    <Palette className="w-3 h-3" />
                </button>
                {showColorPicker && (
                    <div className="absolute top-full left-0 mt-2 p-2 bg-[#222] border border-white/10 rounded-lg shadow-xl flex gap-2 z-50">
                        <ColorDot color="#CF2F31" onClick={() => insertColor('--color-accent')} label="Accent" />
                        <ColorDot color="#22c55e" onClick={() => insertColor('--color-green-500')} label="Green" />
                        <ColorDot color="#3b82f6" onClick={() => insertColor('--color-blue-500')} label="Blue" />
                        <ColorDot color="#a1a1a1" onClick={() => insertColor('--color-text-secondary')} label="Gray" />
                    </div>
                )}
            </div>
        </div>
    );
}

function ToolBtn({ icon, onClick, tip }: { icon: React.ReactNode, onClick: () => void, tip: string }) {
    return <button onClick={onClick} title={tip} className="p-1.5 hover:bg-white/10 rounded text-neutral-400 cursor-pointer hover:text-white transition-colors">{icon}</button>;
}

function ColorDot({ color, onClick, label }: { color: string, onClick: () => void, label: string }) {
    return <button onClick={onClick} title={label} className="w-4 h-4 rounded-full border cursor-pointer border-white/10 hover:scale-110 transition-transform" style={{ backgroundColor: color }} />;
}
