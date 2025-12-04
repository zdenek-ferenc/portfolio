import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface EditorPaneProps {
    content: string;
    setContent: (v: string) => void;
    isPreview: boolean;
}

export default function EditorPane({ content, setContent, isPreview }: EditorPaneProps) {
    return (
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
    );
}
