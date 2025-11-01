"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function BurgerCard({ lanche }) {
  const router = useRouter();
  const precoFormatado = Number(lanche.preco).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  const handleSelectLanche = () => {
    const imageUrl = `/assets/burgers/burger${lanche.id}.png`;
    const lancheSelecionado = {
      nome: lanche.nome,
      imagem: imageUrl,
      preco: lanche.preco
    };
    localStorage.setItem('lancheParaPersonalizar', JSON.stringify(lancheSelecionado));
    router.push('/personalizacao');
  };
  const imageUrl = `/assets/burgers/burger${lanche.id}.png`;
  return (
    <div 
      onClick={handleSelectLanche} 
      className=" bg-zinc-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-105 "
    >
      <div className="w-full h-44 relative">
        <Image
          src={imageUrl}
          alt={lanche.nome}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-400">Tradicional</div>
        <div className="text-xl font-bold text-white my-1">{lanche.nome}</div>
        <div className="text-sm text-gray-300 h-29">{lanche.descricao}</div>
        <div className="text-lg font-semibold text-amber-500 mt-2">{precoFormatado}</div>
      </div>
    </div>
  );
}