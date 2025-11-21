"use client";
import Link from 'next/link';
export default function Header() {
  return (
    <header className="bg-zinc-900 text-white">
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        <div className="text-2xl font-bold">
          <Link href="/">
            Code <span className="text-amber-500">•</span> Burger
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex gap-4">
            <li><Link href="/" className="hover:text-amber-500">Início</Link></li>
            <li><Link href="/" className="hover:text-amber-500">Burgers</Link></li>
            <li><Link href="/" className="hover:text-amber-500">Contato</Link></li>
          </ul>
          <div className="flex items-center gap-3">
            <Link href="/" className="bg-amber-500 text-black font-bold py-2 px-4 rounded-lg text-sm hover:bg-amber-600">
              Fazer pedido
            </Link>
            <Link href="/login" className="border border-gray-600 py-2 px-4 rounded-lg text-sm font-bold hover:bg-zinc-800">
              Login
            </Link>
            <Link href="/cadastro" className="border border-gray-600 py-2 px-4 rounded-lg text-sm font-bold hover:bg-zinc-800">
              Cadastro
            </Link>
            <Link href="/carrinho" className="relative text-2xl hover:text-amber-500">
              <i className="fas fa-shopping-cart"></i>
              <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </nav>
        <div className="md:hidden text-3xl">
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </header>
  );
}