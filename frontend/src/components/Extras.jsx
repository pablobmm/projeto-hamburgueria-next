"use client";
import Image from 'next/image';

function formatarPreco(valor) {
    return Number(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

export default function Extras({ adicional, quantidade, aoMudarQuantidade }) {
    
    const diminuir = () => {
        aoMudarQuantidade(adicional.nome, Math.max(0, quantidade - 1));
    };

    const aumentar = () => {
        aoMudarQuantidade(adicional.nome, quantidade + 1);
    };

    return (
        <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg mb-2">
            <div className="flex items-center gap-3">
                <Image src={adicional.imagem} alt={adicional.nome} width={40} height={40} className="rounded" />
                <span>{adicional.nome}</span>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-gray-400">{formatarPreco(adicional.preco)}</span>
                <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded">
                    <button 
                        onClick={diminuir}
                        className="text-amber-500 font-bold w-6 h-6 rounded flex items-center justify-center hover:bg-zinc-700"
                    >
                        -
                    </button>
                    <span className="w-6 text-center">{quantidade}</span>
                    <button 
                        onClick={aumentar}
                        className="text-amber-500 font-bold w-6 h-6 rounded flex items-center justify-center hover:bg-zinc-700"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}