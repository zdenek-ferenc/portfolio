import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import rehypeRaw from "rehype-raw"

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
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium uppercase tracking-wider border border-accent/20">
                    {post.category}
                </span>
                <span className="text-neutral-500 text-sm font-mono">{post.date}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
                {post.title}
            </h1>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
  <ReactMarkdown 
    rehypePlugins={[rehypeRaw]}
    components={{
      h1: (props) => <h1 className="text-3xl md:text-4xl font-bold text-white mt-10 mb-6 tracking-tight" {...props} />,
      h2: (props) => <h2 className="text-2xl md:text-3xl font-bold text-white mt-8 mb-4 tracking-tight" {...props} />,
      h3: (props) => <h3 className="text-xl md:text-2xl font-semibold text-white mt-6 mb-3" {...props} />,
      p: (props) => <p className="mb-6 text-neutral-300 leading-relaxed text-lg" {...props} />,
      ul: (props) => <ul className="list-disc list-inside mb-6 text-neutral-300 space-y-2 ml-4" {...props} />,
      ol: (props) => <ol className="list-decimal list-inside mb-6 text-neutral-300 space-y-2 ml-4" {...props} />,
      li: (props) => <li className="pl-2" {...props} />,
      a: (props) => <a className="text-accent font-medium hover:underline underline-offset-4 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
      blockquote: (props) => <blockquote className="border-l-4 border-accent pl-6 py-2 my-8 italic text-neutral-400 bg-white/5 rounded-r-xl" {...props} />,
      img: (props) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="rounded-xl shadow-2xl border border-white/10 my-8 w-full h-auto" {...props} alt={props.alt || "DevLog Image"} />
      ),
      code: (props) => {
        const isBlock = props.className?.includes('language-'); 
        return isBlock 
          ? <code className="block bg-[#111] p-6 rounded-xl text-sm font-mono overflow-x-auto my-6 border border-white/10 shadow-inner text-neutral-200" {...props} />
          : <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-accent font-semibold" {...props} />
      }
    }}
  >
    {post.content}
  </ReactMarkdown>
</div>
      </article>
    </main>
  );
}