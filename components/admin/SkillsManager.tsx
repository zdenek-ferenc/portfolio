"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { compressImage } from "@/lib/image-optimizer";
import { Plus, Trash2, ImagePlus, Loader2 } from "lucide-react";
import Image from "next/image";

interface SkillItem {
  id: string;
  name: string;
  icon: string;
  order: number;
  className?: string;
}

export default function SkillsManager() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [order, setOrder] = useState<number>(0);
  const [className, setClassName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "skills"), orderBy("order", "asc"));
    return onSnapshot(q, (snapshot) => {
      setSkills(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SkillItem)));
    });
  }, []);

  const resetForm = () => {
    setName(""); setIcon(""); setOrder(skills.length + 1); setClassName(""); setEditingId(null);
  };

  const handleEdit = (skill: SkillItem) => {
    setEditingId(skill.id);
    setName(skill.name);
    setIcon(skill.icon);
    setOrder(skill.order);
    setClassName(skill.className || "");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !icon) return;
    setIsSaving(true);

    try {
      const data = {
        name,
        icon,
        order: Number(order) || 0,
        className: className || null,
      };

      if (editingId) {
        await updateDoc(doc(db, "skills", editingId), data);
      } else {
        await addDoc(collection(db, "skills"), data);
      }
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Chyba při ukládání do Firebase");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Opravdu smazat tento skill?")) return;
    try {
      await deleteDoc(doc(db, "skills", id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const compressedFile = await compressImage(file);
      const storageRef = ref(storage, `skills/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, compressedFile);
      const url = await getDownloadURL(storageRef);
      setIcon(url);
    } catch (error) {
      console.error(error);
      alert("Nahrávání selhalo (Storage)");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/[0.04] bg-neutral-950">
      {/* Sidebar List */}
      <aside className="w-full md:w-80 flex flex-col overflow-hidden h-1/2 md:h-full">
        <div className="p-4 border-b border-white/[0.04] flex justify-between items-center bg-neutral-900/40">
          <h2 className="font-bold text-white text-sm">Skills ({skills.length})</h2>
          <button onClick={resetForm} className="p-1.5 hover:bg-white/[0.08] rounded-md cursor-pointer text-neutral-400 hover:text-white">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
          {skills.map((skill) => (
            <div
              key={skill.id}
              onClick={() => handleEdit(skill)}
              className={`p-3 rounded-xl cursor-pointer border flex items-center justify-between transition-all ${
                editingId === skill.id ? "bg-white/[0.05] border-accent/40" : "border-transparent hover:bg-white/[0.03]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-1 rounded-lg bg-neutral-900 w-10 h-10 flex items-center justify-center border border-white/[0.04]">
                  {skill.icon && (
                    <Image src={skill.icon} alt={skill.name} width={24} height={24} className={`object-contain ${skill.className || ""}`} />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white">{skill.name}</h3>
                  <span className="text-[10px] text-neutral-500 font-mono">Pořadí: {skill.order}</span>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(skill.id); }}
                className="p-1.5 hover:bg-red-500/10 rounded-md text-neutral-500 hover:text-red-500 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* Form Editor */}
      <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="pb-4 border-b border-white/[0.04]">
            <h1 className="text-xl font-bold text-white">
              {editingId ? "Editovat Skill" : "Nový Skill"}
            </h1>
            <p className="text-xs text-neutral-500 mt-1">Spravuj položky technologií pro BentoGrid.</p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1.5">Název</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Např. React, Next.js"
                className="w-full bg-neutral-900 border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent/40 text-white"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1.5">Ikona (URL nebo nahrát)</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="https://... nebo klikni na nahrát"
                  className="flex-1 bg-neutral-900 border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent/40 text-white"
                  required
                />
                <label className="flex items-center gap-2 cursor-pointer bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-white/[0.08] transition-colors text-neutral-300">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  {isUploading ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : <ImagePlus className="w-4 h-4" />}
                  Nahrát
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1.5">Pořadí</label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent/40 text-white"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1.5">ClassName (invert...)</label>
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="invert, grayscale..."
                  className="w-full bg-neutral-900 border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent/40 text-white"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-xl border border-white/[0.08] text-sm font-medium text-neutral-400 hover:bg-white/[0.03] transition-colors cursor-pointer"
                >
                  Zrušit
                </button>
              )}
              <button
                type="submit"
                disabled={isSaving || isUploading}
                className="ml-auto flex items-center gap-2 bg-accent text-white px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer hover:bg-accent/90 transition-all disabled:opacity-50"
              >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingId ? "Uložit změny" : "Vytvořit skill"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
