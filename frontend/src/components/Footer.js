import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white mt-20 py-10">
      <div className="container mx-auto px-4 flex justify-center items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">
            Code <span className="text-amber-500">•</span> Burger
          </Link>
        </div>
        {/* Você pode adicionar mais links aqui se precisar */}
      </div>
    </footer>
  );
}