import Link from 'next/link';
import { Github, Linkedin, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--glass-border)] bg-[var(--background)]/80 backdrop-blur-[var(--blur-std)] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <h2 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-emerald-400 to-indigo-500 bg-clip-text text-transparent italic tracking-tighter">
              SHIREFF.
            </h2>
            <p className="text-zinc-500 text-lg leading-relaxed max-w-sm">
              Engineering high-performance digital systems with meticulous visual design and state-of-the-art architectures.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/shireff" target='_blank' aria-label="GitHub Profile" className="p-2 glass-card hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/shireffnady/" target='_blank' aria-label="LinkedIn Profile" className="p-2 glass-card hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
                <Linkedin size={20} />
              </a>

              <a href="mailto:shireffn369@gmail.com" target='_blank' aria-label="Email Contact"
                className="p-2 glass-card hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/projects" className="text-zinc-400 hover:text-blue-400 transition-colors">Projects</Link></li>
              <li><Link href="/experiences" className="text-zinc-400 hover:text-blue-400 transition-colors">Experience</Link></li>
              <li><Link href="/verification" className="text-zinc-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                Verification Hub <span className="bg-blue-500/10 text-blue-400 text-[8px] px-1.5 py-0.5 rounded border border-blue-500/20 font-black">PRO</span>
              </Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-zinc-500 text-sm">
            <span>© {new Date().getFullYear()} Shireff. All rights reserved.</span>
            <div className="h-3 w-[1px] bg-white/10" />
            <Link href="/verification" className="flex items-center gap-2 hover:text-blue-400 transition-all text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={12} className="text-blue-500" />
              Evidence-Based Portfolio
            </Link>
          </div>
          <p className="text-zinc-500 text-sm">
            Designed and built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
