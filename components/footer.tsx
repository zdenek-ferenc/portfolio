"use client";

export default function Footer() {
  return (
    <footer className="px-6 py-24 border-t border-white/5 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start justify-between">
          
          <div className="space-y-8">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Zdenek Ferenc</h2>
              <p className="text-neutral-400 max-w-xs">
                Product Engineer tvořící digitální produkty s důrazem na detail a uživatelskou zkušenost.
              </p>
            </div>

            <div className="flex gap-6 text-sm text-neutral-500 font-medium animate-fade-in-up delay-100">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>

          <div className="md:text-right space-y-8">
             <div className="animate-fade-in-up delay-200">
              <p className="text-neutral-500 text-sm font-mono mb-4">MÁTE PROJEKT?</p>
              <a 
                href="mailto:zdenekk.ferenc@gmail.com" 
                className="text-xl md:text-2xl font-bold text-white hover:text-accent transition-colors tracking-tight"
              >
                zdenekk.ferenc@gmail.com
              </a>
            </div>
          </div>
          <p className="text-neutral-600 text-sm animate-fade-in-up delay-300">
              © {new Date().getFullYear()} Zdenek Ferenc. Všechna práva vyhrazena.
            </p>
        </div>
        
      </div>
    </footer>
  );
}
