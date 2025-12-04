import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/lib/firebase";
import { compressImage } from "@/lib/image-optimizer";
import { DevLogPost } from "./types";
import AdminSidebar from "./AdminSidebar";
import EditorHeader from "./EditorHeader";
import EditorToolbar from "./EditorToolbar";
import EditorPane from "./EditorPane";

export default function DevLogManager() {
    // Data
    const [posts, setPosts] = useState<DevLogPost[]>([]);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

    // Editor content
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Feature");
    const [content, setContent] = useState("");
    const [slug, setSlug] = useState("");

    // Editor settings & UI
    const [isPreview, setIsPreview] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // --- Effects ---

    useEffect(() => {
        const q = query(collection(db, "devlog"), orderBy("createdAt", "desc"));
        return onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DevLogPost)));
        });
    }, []);

    // --- Handlers ---

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

    const handleDelete = async () => {
        if (!selectedPostId || !confirm("Smazat?")) return;
        await deleteDoc(doc(db, "devlog", selectedPostId));
        resetForm();
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

    return (
        <div className="min-h-screen bg-background text-neutral-200 flex flex-col md:flex-row overflow-hidden">

            <AdminSidebar
                posts={posts}
                selectedPostId={selectedPostId}
                onSelectPost={handleEdit}
                onNewPost={resetForm}
                onSignOut={() => signOut(auth)}
            />

            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
                <EditorHeader
                    title={title}
                    setTitle={setTitle}
                    isSaving={isSaving}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    isPreview={isPreview}
                    setIsPreview={setIsPreview}
                    hasSelectedPost={!!selectedPostId}
                    setSlug={setSlug}
                />

                <EditorToolbar
                    category={category}
                    setCategory={setCategory}
                    onInsertText={insertText}
                    onImageUpload={handleImageUpload}
                    isUploading={isUploading}
                />

                <EditorPane
                    content={content}
                    setContent={setContent}
                    isPreview={isPreview}
                />
            </main>
        </div>
    );
}
