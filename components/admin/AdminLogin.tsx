import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "@/lib/firebase";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch {
            alert("Nesprávné údaje");
        }
    };

    return (
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
}
