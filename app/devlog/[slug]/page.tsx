import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function DevLogPage({ params }: { params: { slug: string } }) {
  const { slug } = await params; 

  const q = query(collection(db, "devlog"), where("slug", "==", slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return notFound();
  }

  const post = querySnapshot.docs[0].data();

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 px-6 py-24">
      <article className="max-w-3xl mx-auto">
        <Link href="/#devlog" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Zpět na přehled
        </Link>

        <header className="mb-12">
            <div className="flex gap-4 items-center mb-4">
                <span className="px-3 py-1 rounded-full bg-[#CF2F31]/10 text-[#CF2F31] text-xs font-medium uppercase tracking-wider border border-[#CF2F31]/20">
                    {post.category}
                </span>
                <span className="text-neutral-500 text-sm font-mono">{post.date}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
                {post.title}
            </h1>
        </header>

        <div className="prose prose-invert prose-lg prose-neutral max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}