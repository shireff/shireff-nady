'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import { authService } from '@/services/auth';
import Icon from '@/components/atomic/atoms/Icon';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearAuth } from '@/store/slices/authSlice';

const navItems = [
  { name: 'Projects', href: '/projects', icon: 'Code2' },
  { name: 'Recommendations', href: '/recommendations', icon: 'Award' },
  { name: 'Experience', href: '/experiences', icon: 'Briefcase' },
  { name: 'Contact', href: '/contact', icon: 'MessageSquare' },
];

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
      scrolled ? 'bg-background/80 backdrop-blur-std border-b border-glass-border py-5 px-6' : 'py-4 px-6'
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
                'text-sm font-bold uppercase tracking-widest transition-colors hover:text-blue-400',
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
                className="text-zinc-400 hover:text-red-400 transition-colors p-2 rounded-lg"
                title="Logout"
                aria-label="Logout"
              >
                <Icon name="LogOut" size="sm" />
              </button>
            </div>
          ) : null}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-zinc-400 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <Icon name="X" size="md" /> : <Icon name="Menu" size="md" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-nav p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300 bg-background/95 backdrop-blur-xl border-b border-glass-border">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-4 py-3 text-sm font-bold uppercase tracking-[0.2em]',
                pathname === item.href ? 'text-blue-400' : 'text-zinc-400'
              )}
              onClick={() => setIsOpen(false)}
            >
              <Icon name={item.icon as any} size="sm" variant={pathname === item.href ? 'accent' : 'muted'} />
              {item.name}
            </Link>
          ))}
          <hr className="border-glass-border my-2" />
          {isLoggedIn ? (
            <div className="flex flex-col gap-4">
              <Link href="/admin" className="text-zinc-400 py-3 font-bold uppercase tracking-widest" onClick={() => setIsOpen(false)}>Dashboard</Link>
              <button onClick={handleLogout} className="text-red-400 py-3 text-left font-bold uppercase tracking-widest">Logout</button>
            </div>
          ) : (
            <Link href="/admin/login" className="text-zinc-400 py-3 font-bold uppercase tracking-widest" onClick={() => setIsOpen(false)}>Admin Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
