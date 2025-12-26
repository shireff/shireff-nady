'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Code2, Briefcase, Split, User, LogOut, MessageSquare, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import { authService } from '@/services/auth';

const navItems = [
  { name: 'Projects', href: '/projects', icon: Code2 },
  { name: 'Skills', href: '/#skills', icon: Layers },
  { name: 'Experience', href: '/experiences', icon: Briefcase },
  // { name: 'Comparisons', href: '/state-comparisons', icon: Split },
  { name: 'Contact', href: '/contact', icon: MessageSquare },
];

// Redux
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearAuth } from '@/store/slices/authSlice';

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { isAuthenticated: isLoggedIn } = useAppSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    authService.logout();
    dispatch(clearAuth());
    window.location.href = '/';
  };

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-[var(--background)]/80 backdrop-blur-[var(--blur-std)] border-b border-[var(--glass-border)] py-5 px-6' : 'py-4 px-6'
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl font-black bg-gradient-to-r from-blue-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent italic tracking-tighter">
          SHIREFF.
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-blue-400',
                pathname === item.href ? 'text-blue-400' : 'text-zinc-400'
              )}
            >
              {item.name}
            </Link>
          ))}

          <ThemeToggle />

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="glass" size="sm">Dashboard</Button>
              </Link>
              <button
                onClick={handleLogout}
                className="text-zinc-400 hover:text-red-400 transition-colors"
                title="Logout"
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            // <Link href="/admin/login">
            //   <Button variant="outline" size="sm">Admin</Button>
            // </Link>
            <div></div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-zinc-400"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-nav p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 py-2 text-lg',
                pathname === item.href ? 'text-blue-400 font-bold' : 'text-zinc-400'
              )}
              onClick={() => setIsOpen(false)}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
          <hr className="border-white/10 my-2" />
          {isLoggedIn ? (
            <>
              <Link href="/admin" className="text-zinc-400 py-2" onClick={() => setIsOpen(false)}>Dashboard</Link>
              <button onClick={handleLogout} className="text-red-400 py-2 text-left">Logout</button>
            </>
          ) : (
            <Link href="/admin/login" className="text-zinc-400 py-2" onClick={() => setIsOpen(false)}>Admin Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
