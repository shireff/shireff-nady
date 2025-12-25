import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

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
              <a href="https://github.com/shireff" target='_blank' className="p-2 glass-card hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/shireffnady/" target='_blank' className="p-2 glass-card hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
                <Linkedin size={20} />
              </a>

              <a href="mailto:shireffn369@gmail.com" target='_blank'
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
              <li><Link href="/state-comparisons" className="text-zinc-400 hover:text-blue-400 transition-colors">Comparisons</Link></li>
            </ul>
          </div>

          {/* <div>
            <h4 className="text-white font-bold mb-6">Admin</h4>
            <ul className="space-y-4">
              <li><Link href="/admin/login" className="text-zinc-400 hover:text-blue-400 transition-colors">Login</Link></li>
              <li><Link href="/admin" className="text-zinc-400 hover:text-blue-400 transition-colors">Dashboard</Link></li>
            </ul>
          </div> */}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Shireff. All rights reserved.
          </p>
          <p className="text-zinc-500 text-sm">
            Designed and built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
