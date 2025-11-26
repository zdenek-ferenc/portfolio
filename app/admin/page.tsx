"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Feature");
  const [content, setContent] = useState(""); 
  const [slug, setSlug] = useState("");


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      alert("Chyba přihlášení");
    }
  };

  const handleCreateEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) return;

    try {
      await addDoc(collection(db, "devlog"), {
        title,
        slug, 
        category,
        content, 
        date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), 
        createdAt: serverTimestamp(),
      });
      alert("Záznam přidán!");
      setTitle(""); setSlug(""); setContent("");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Chyba při ukládání");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <form onSubmit={handleLogin} className="flex flex-col gap-4 p-8 border border-white/10 rounded-xl">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <input type="email" placeholder="Email" className="p-2 bg-neutral-900 border border-white/20 rounded" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Heslo" className="p-2 bg-neutral-900 border border-white/20 rounded" onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="bg-white text-black p-2 rounded font-bold">Přihlásit</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-neutral-950 text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Přidat DevLog Entry</h1>
      
      <form onSubmit={handleCreateEntry} className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
            <input 
                type="text" 
                placeholder="Nadpis (např. Integrace Stripe)" 
                value={title}
                onChange={e => {
                    setTitle(e.target.value);
                    setSlug(e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
                }}
                className="p-3 bg-neutral-900 border border-white/10 rounded-lg"
            />
            <select 
                value={category} 
                onChange={e => setCategory(e.target.value)}
                className="p-3 bg-neutral-900 border border-white/10 rounded-lg"
            >
                <option value="Feature">Feature</option>
                <option value="Design">Design</option>
                <option value="Backend">Backend</option>
                <option value="Bugfix">Bugfix</option>
            </select>
        </div>

        <input 
            type="text" 
            placeholder="URL Slug (automaticky)" 
            value={slug}
            onChange={e => setSlug(e.target.value)}
            className="p-3 bg-neutral-900 border border-white/10 rounded-lg text-neutral-500"
        />

        <textarea 
            placeholder="Obsah článku (Markdown)..." 
            value={content}
            onChange={e => setContent(e.target.value)}
            className="p-3 bg-neutral-900 border border-white/10 rounded-lg min-h-[300px] font-mono"
        />

        <button type="submit" className="bg-accent py-3 rounded-lg font-bold hover:bg-red-600 transition-colors">
            Publikovat
        </button>
      </form>
    </div>
  );
}