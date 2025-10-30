"use client"; 

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-zinc-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Code Burger
        </Link>
        <nav>
          <Link href="/login" className="ml-4">Login</Link>
          <Link href="/cadastro" className="ml-4">Cadastro</Link>
        </nav>
      </div>
    </header>
  );
}