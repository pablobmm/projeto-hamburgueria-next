"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Extras from '@/components/Extras';

const adicionaisDisponiveis = [
    { nome: 'Molho Tasty', preco: 2.00, imagem: '/assets/adicionais/molho_tasty.png' },
    { nome: 'Cebola fresca', preco: 1.00, imagem: '/assets/adicionais/cebola.png' },
    { nome: 'Alface', preco: 0.50, imagem: '/assets/adicionais/alface.png' },
    { nome: 'Bacon', preco: 3.00, imagem: '/assets/adicionais/bacon.png' },
    { nome: 'Carne', preco: 5.00, imagem: '/assets/adicionais/carne.png' },
    { nome: 'Queijo', preco: 2.50, imagem: '/assets/adicionais/queijo.png' },
];

function formatarPreco(valor) {
    return Number(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

export default function PaginaPersonalizar() {
    const router = useRouter();

    const [lanche, setLanche] = useState(null);
    const [adicionais, setAdicionais] = useState({});
    const [precoTotal, setPrecoTotal] = useState(0);
    const [estaEditando, setEstaEditando] = useState(false);

    useEffect(() => {
        const itemParaEditar = JSON.parse(localStorage.getItem('itemParaEditar'));
        const lancheNovo = JSON.parse(localStorage.getItem('lancheParaPersonalizar'));

        let itemBase = null;
        let quantidadesIniciais = {};

        adicionaisDisponiveis.forEach(adicional => {
            quantidadesIniciais[adicional.nome] = 0;
        });

        if (itemParaEditar) {
            itemBase = itemParaEditar;
            setEstaEditando(true);

            itemParaEditar.adicionais.forEach(adicional => {
                quantidadesIniciais[adicional.nome] = adicional.quantidade;
            });
        } else if (lancheNovo) {
            itemBase = {
                ...lancheNovo,
                precoBase: lancheNovo.preco,
                descricao: "Experimente essa combinação que está irresistível!",
            };
            setEstaEditando(false);
        } else {
            router.push('/');
            return;
        }

        setLanche(itemBase);
        setAdicionais(quantidadesIniciais);

    }, [router]);

    useEffect(() => {
        if (!lanche) return;

        let total = Number(lanche.precoBase);

        adicionaisDisponiveis.forEach(adicional => {
            const quantidade = adicionais[adicional.nome] || 0;
            total += adicional.preco * quantidade;
        });

        setPrecoTotal(total);

    }, [lanche, adicionais]);

    const mudarQuantidadeAdicional = (nomeAdicional, novaQuantidade) => {
        setAdicionais(adicionaisAnteriores => ({
            ...adicionaisAnteriores,
            [nomeAdicional]: novaQuantidade
        }));
    };

    const salvarNoCarrinho = () => {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

        const adicionaisSelecionados = adicionaisDisponiveis
            .filter(adicional => adicionais[adicional.nome] > 0)
            .map(adicional => ({
                nome: adicional.nome,
                quantidade: adicionais[adicional.nome]
            }));

        const itemParaSalvar = {
            id: estaEditando ? lanche.id : Date.now(),
            nome: lanche.nome,
            imagem: lanche.imagem,
            precoBase: lanche.precoBase,
            precoTotalUnitario: precoTotal,
            quantidade: estaEditando ? lanche.quantidade : 1,
            adicionais: adicionaisSelecionados
        };

        let novoCarrinho;

        if (estaEditando) {
            novoCarrinho = carrinho.map(item =>
                item.id === itemParaSalvar.id ? itemParaSalvar : item
            );
            localStorage.removeItem('itemParaEditar');
        } else {
            novoCarrinho = [...carrinho, itemParaSalvar];
        }

        localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
        router.push('/carrinho');
    };

    if (!lanche) {
        return <div>Carregando...</div>;
    }

    return (
        <main className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1 text-center">
                    <Image src={lanche.imagem} alt={lanche.nome} width={400} height={400} className="mx-auto" />
                    <h1 className="text-4xl font-bold mt-4">{lanche.nome}</h1>
                    <p className="text-gray-400 mt-2 text-lg">{lanche.descricao}</p>
                    <p className="text-amber-500 text-3xl font-bold my-4">{formatarPreco(precoTotal)}</p>
                    <button
                        onClick={salvarNoCarrinho}
                        className="bg-amber-500 text-black font-bold py-3 px-16 rounded-lg text-lg hover:bg-amber-600 w-full"
                    >
                        {estaEditando ? 'Salvar Alterações' : 'Adicionar ao carrinho'}
                    </button>
                </div>

                <div className="flex-1">
                    <div className="bg-zinc-900 p-6 rounded-lg">
                        <h2 className="text-amber-500 font-bold text-xl mb-4">Personalize seu produto</h2>

                        <div className="flex flex-col gap-2">
                            {adicionaisDisponiveis.map(adicional => (
                                <Extras
                                    key={adicional.nome}
                                    adicional={adicional}
                                    quantidade={adicionais[adicional.nome] || 0}
                                    aoMudarQuantidade={mudarQuantidadeAdicional}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}