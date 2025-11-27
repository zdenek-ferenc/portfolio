"use client";

import { useState, useEffect, useRef } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth";
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/lib/firebase";
import { compressImage } from "@/lib/image-optimizer"; 
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { 
  Layout, LogOut, Plus, Save, Trash2, Edit3, Eye, 
  Bold, Italic, Code, Link as LinkIcon, List, 
  Image as ImageIcon, Palette, Loader2,
  Heading1, Heading2, Heading3
} from "lucide-react";

// --- Typy ---
interface DevLogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  date: string;
}

export default function AdminPage() {
  // Auth & Data
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [posts, setPosts] = useState<DevLogPost[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  
  // Form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Editor content
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Feature");
  const [content, setContent] = useState(""); 
  const [slug, setSlug] = useState("");
  
  // Editor settings & UI
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Effects ---

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "devlog"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DevLogPost)));
    });
  }, [user]);

  // --- Handlers ---

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      alert("Nesprávné údaje");
    }
  };

  const resetForm = () => {
    setTitle(""); setSlug(""); setContent(""); setCategory("Feature"); setSelectedPostId(null);
  };

  const handleEdit = (post: DevLogPost) => {
    setSelectedPostId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setContent(post.content);
    setCategory(post.category);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Smazat?")) return;
    await deleteDoc(doc(db, "devlog", id));
    if (selectedPostId === id) resetForm();
  };

  const handleSave = async () => {
    if (!title || !slug || !content) return;
    setIsSaving(true);
    try {
      const postData = { 
        title, slug, category, content, 
        date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) 
      };
      
      if (selectedPostId) {
        await updateDoc(doc(db, "devlog", selectedPostId), postData);
      } else {
        await addDoc(collection(db, "devlog"), { ...postData, createdAt: serverTimestamp() });
      }
      if (!selectedPostId) resetForm();
    } catch (error) {
      console.error(error);
      alert("Chyba při ukládání");
    }
    setIsSaving(false);
  };

  // --- Editor Logic ---

  const insertText = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement;
    if (!textarea) return;
    const { selectionStart, selectionEnd, value } = textarea;
    const newText = value.substring(0, selectionStart) + prefix + value.substring(selectionStart, selectionEnd) + suffix + value.substring(selectionEnd);
    setContent(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(selectionStart + prefix.length, selectionEnd + prefix.length);
    }, 0);
  };

  const insertColor = (colorVar: string) => {
    insertText(`<span style="color: var(${colorVar})">`, "</span>");
    setShowColorPicker(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    try {
      // 1. Optimalizace
      const compressedFile = await compressImage(file);
      
      // 2. Upload na Firebase
      const storageRef = ref(storage, `devlog/${Date.now()}-${compressedFile.name}`);
      await uploadBytes(storageRef, compressedFile);
      const url = await getDownloadURL(storageRef);

      // 3. Vložení HTML kódu pro obrázek (s Tailwind třídami pro kontrolu)
      // Defaultně: Full width, zaoblené rohy, stín
      const imageHtml = `
<img 
  src="${url}" 
  alt="${file.name}" 
  class="w-full h-auto rounded-xl border border-white/10 my-6" 
/>
`;
      insertText(imageHtml);
    } catch (error) {
      console.error(error);
      alert("Upload selhal (CORS error? Zkontroluj konzoli)");
    }
    setIsUploading(false);
  };

  // --- Render ---

  if (loadingAuth) return <div className="min-h-screen bg-background flex items-center justify-center text-neutral-500">Načítám...</div>;

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(207,47,49,0.1)_0%,transparent_50%)]" />
        <form onSubmit={handleLogin} className="relative z-10 flex flex-col gap-4 p-8 w-full max-w-md bg-neutral-900/50 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl">
          <h1 className="text-2xl font-bold text-white text-center">Mission Control</h1>
          <input type="email" placeholder="Email" className="p-3 bg-black/20 border border-white/10 rounded-lg text-white focus:border-accent outline-none" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Heslo" className="p-3 bg-black/20 border border-white/10 rounded-lg text-white focus:border-accent outline-none" onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="bg-accent text-white p-3 rounded-lg font-bold hover:bg-red-600 transition-all">Vstoupit</button>
        </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-neutral-200 flex flex-col md:flex-row overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-full md:w-80 border-r border-white/5 bg-neutral-900/30 flex flex-col h-[300px] md:h-screen">
        <div className="p-4 border-b border-white/5 flex justify-between bg-neutral-900/50">
          <h2 className="font-bold text-white flex items-center gap-2"><Layout className="w-4 h-4 text-accent" /> DevLog</h2>
          <div className="flex gap-2">
            <button onClick={resetForm} className="p-2 hover:bg-white/10 rounded cursor-pointer text-neutral-400 hover:text-white"><Plus className="w-4 h-4" /></button>
            <button onClick={() => signOut(auth)} className="p-2 hover:bg-white/10 rounded cursor-pointer text-neutral-400 hover:text-red-500"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
          {posts.map(post => (
            <div key={post.id} onClick={() => handleEdit(post)} className={`p-3 rounded-lg cursor-pointer border ${selectedPostId === post.id ? "bg-white/5 border-accent/50" : "border-transparent hover:bg-white/5"}`}>
              <h3 className="font-medium text-sm text-white truncate">{post.title}</h3>
              <div className="flex justify-between items-center mt-1 text-xs text-neutral-500">
                <span>{post.date}</span><span className="bg-white/5 px-1.5 py-0.5 rounded">{post.category}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Editor */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-neutral-900/30 backdrop-blur-md z-20">
          <input 
            value={title}
            onChange={e => { setTitle(e.target.value); if (!selectedPostId) setSlug(e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')); }}
            placeholder="Název příspěvku..." 
            className="bg-transparent text-xl font-bold text-white placeholder:text-neutral-600 focus:outline-none w-full max-w-2xl"
          />
          <div className="flex items-center gap-3">
            <button onClick={() => setIsPreview(!isPreview)} className="md:hidden p-2 hover:bg-white/5 rounded cursor-pointer text-neutral-400">{isPreview ? <Edit3 className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}</button>
            {selectedPostId && <button onClick={() => handleDelete(selectedPostId!)} className="p-2 hover:bg-red-500/10 cursor-pointer text-neutral-500 hover:text-red-500 rounded"><Trash2 className="w-5 h-5" /></button>}
            <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 bg-accent/80 hover:bg-accent transition-all ease-in-out duration-200 cursor-pointer text-white px-4 py-2 rounded font-medium text-sm disabled:opacity-50">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin"/> : <><Save className="w-4 h-4" /> {selectedPostId ? "Upravit" : "Publikovat"}</>}
            </button>
          </div>
        </header>

        {/* Toolbar */}
        <div className="px-4 py-2 border-b border-white/5 bg-neutral-900/20 flex flex-wrap gap-2 items-center select-none overflow-x-auto">
            <select value={category} onChange={e => setCategory(e.target.value)} className="bg-white cursor-pointer border border-white/10 rounded px-2 py-1 text-xs text-black outline-none focus:border-accent">
                {["Feature", "Design", "Backend", "Bugfix", "Learning"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            
            <div className="w-px h-4 bg-white/10 mx-2" />
            
            {/* Typography */}
            <div className="flex gap-1">
                <ToolBtn icon={<Heading1 className="w-4 h-4" />} onClick={() => insertText('# ')} tip="Velký nadpis" />
                <ToolBtn icon={<Heading2 className="w-4 h-4" />} onClick={() => insertText('## ')} tip="Střední nadpis" />
                <ToolBtn icon={<Heading3 className="w-4 h-4" />} onClick={() => insertText('### ')} tip="Malý nadpis" />
            </div>

            <div className="w-px h-4 bg-white/10 mx-2" />

            {/* Formatting */}
            <div className="flex gap-1">
                <ToolBtn icon={<Bold className="w-3 h-3" />} onClick={() => insertText('**', '**')} tip="Tučně" />
                <ToolBtn icon={<Italic className="w-3 h-3" />} onClick={() => insertText('*', '*')} tip="Kurzíva" />
                <ToolBtn icon={<Code className="w-3 h-3" />} onClick={() => insertText('`', '`')} tip="Kód" />
                <ToolBtn icon={<List className="w-3 h-3" />} onClick={() => insertText('\n- ')} tip="Seznam" />
                <ToolBtn icon={<LinkIcon className="w-3 h-3" />} onClick={() => insertText('[', '](url)')} tip="Odkaz" />
            </div>
            
            <div className="w-px h-4 bg-white/10 mx-2" />

            {/* Media & Color */}
            <button onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="p-1.5 hover:bg-white/10 rounded text-neutral-400 hover:text-white transition-colors relative" title="Nahrát obrázek">
                {isUploading ? <Loader2 className="w-3 h-3 animate-spin"/> : <ImageIcon className="w-3 h-3" />}
            </button>
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />

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

        {/* Split View */}
        <div className="flex-1 flex overflow-hidden">
            <div className={`flex-1 h-full ${isPreview ? 'hidden md:block' : 'block'}`}>
                <textarea
                    id="content-editor"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Piš svůj příběh..."
                    className="w-full h-full bg-transparent p-6 resize-none focus:outline-none font-mono text-sm leading-relaxed text-neutral-300 custom-scrollbar"
                />
            </div>
            <div className={`flex-1 h-full border-l border-white/5 bg-black/20 overflow-y-auto custom-scrollbar ${isPreview ? 'block' : 'hidden md:block'}`}>
                <div className="p-8 prose prose-invert prose-sm max-w-none 
                    prose-headings:font-bold prose-headings:text-white 
                    prose-a:text-[#CF2F31] prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-xl prose-img:shadow-lg
                ">
                    {content ? <ReactMarkdown 
  rehypePlugins={[rehypeRaw]}
  components={{
    h1: (props) => <h1 className="text-3xl md:text-4xl font-bold text-white mt-8 mb-4 tracking-tight" {...props} />,
    h2: (props) => <h2 className="text-2xl md:text-3xl font-bold text-white mt-6 mb-3 tracking-tight" {...props} />,
    h3: (props) => <h3 className="text-xl md:text-2xl font-semibold text-white mt-4 mb-2" {...props} />,
    p: (props) => <p className="mb-4 text-neutral-300 leading-relaxed" {...props} />,
    ul: (props) => <ul className="list-disc list-inside mb-4 text-neutral-300 space-y-1" {...props} />,
    ol: (props) => <ol className="list-decimal list-inside mb-4 text-neutral-300 space-y-1" {...props} />,
    li: (props) => <li className="ml-4" {...props} />,
    a: (props) => <a className="text-accent hover:underline underline-offset-4 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
    blockquote: (props) => <blockquote className="border-l-4 border-accent pl-4 py-1 my-4 italic text-neutral-400 bg-white/5 rounded-r-lg" {...props} />,
    code: (props) => {
      const isBlock = props.className?.includes('language-'); 
      return isBlock 
        ? <code className="block bg-[#1a1a1a] p-4 rounded-lg text-sm font-mono overflow-x-auto my-4 border border-white/5" {...props} />
        : <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-accent" {...props} />
    }
  }}
>
  {content}
</ReactMarkdown> : <p className="text-neutral-600 italic">Náhled obsahu...</p>}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}

function ToolBtn({ icon, onClick, tip }: { icon: React.ReactNode, onClick: () => void, tip: string }) {
  return <button onClick={onClick} title={tip} className="p-1.5 hover:bg-white/10 rounded text-neutral-400 cursor-pointer hover:text-white transition-colors">{icon}</button>;
}

function ColorDot({ color, onClick, label }: { color: string, onClick: () => void, label: string }) {
  return <button onClick={onClick} title={label} className="w-4 h-4 rounded-full border cursor-pointerborder-white/10 hover:scale-110 transition-transform" style={{ backgroundColor: color }} />;
}