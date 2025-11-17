"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

function formatarPreco(valor) {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function PaginaCarrinho() {
    const [carrinho, setCarrinho] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
        setCarrinho(carrinhoSalvo);

        const novoTotal = carrinhoSalvo.reduce((acumulador, item) => {
            return acumulador + (item.precoTotalUnitario * item.quantidade);
        }, 0);

        setTotal(novoTotal);

        // 🚀 SALVANDO O SUBTOTAL PARA A PÁGINA DE PAGAMENTO
        localStorage.setItem("subtotal", novoTotal);
    }, []);

    return (
        <main className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-amber-500 text-center mb-8">Meu Carrinho</h1>

            <div className="bg-zinc-900 p-6 rounded-lg">
                {carrinho.length === 0 ? (
                    <p>Seu carrinho está vazio.</p>
                ) : (
                    carrinho.map(item => (
                        <div key={item.id} className="flex justify-between items-center mb-4 p-4 bg-zinc-800 rounded">
                            <div>
                                <h2 className="text-xl font-bold">{item.nome} (x{item.quantidade})</h2>
                                <span className="text-gray-400">
                                    {item.adicionais.map(e => `${e.nome} (x${e.quantidade})`).join(', ')}
                                </span>
                            </div>
                            <span className="text-lg font-semibold">
                                {formatarPreco(item.precoTotalUnitario * item.quantidade)}
                            </span>
                        </div>
                    ))
                )}

                {carrinho.length > 0 && (
                    <div className="mt-6 border-t border-zinc-700 pt-4">
                        <div className="flex justify-between text-2xl font-bold">
                            <span>Total</span>
                            <span>{formatarPreco(total)}</span>
                        </div>
                        <Link
                            href="/pagamento"
                            className="block text-center bg-amber-500 text-black font-bold py-3 rounded-lg text-lg w-full mt-6"
                        >
                            Finalizar Pedido
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}
