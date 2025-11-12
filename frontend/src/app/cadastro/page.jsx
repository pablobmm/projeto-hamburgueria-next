// src/app/cadastro/page.jsx
'use client'; 

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

// URL do seu backend Flask para Cadastro
const FLASK_CADASTRO_URL = 'http://localhost:5002/usuario/cadastro'; 

export default function CadastroPage() {
    // 1. Estados para os 6 campos do seu formulário
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null); 
    
    const router = useRouter(); 

    // Função para mostrar as notificações (Toast) - Mesma lógica do Login
    const showToast = (title, description, isError = false) => {
        setMessage({ title, description, isError });
        const toastElement = document.getElementById('toast');
        if (toastElement) {
            toastElement.classList.remove('hidden', 'translate-x-full');
            toastElement.classList.add('translate-x-0');
            
            setTimeout(() => {
                toastElement.classList.remove('translate-x-0');
                toastElement.classList.add('translate-x-full');
                setTimeout(() => toastElement.classList.add('hidden'), 300);
            }, 5000); 
        }
    };

    // 2. Lógica para enviar dados de Cadastro ao Flask
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        if (password !== confirmPassword) {
            showToast('Erro de Senha', 'A senha e a confirmação de senha não coincidem.', true);
            return;
        }

        setIsLoading(true);
        setMessage(null); 

        try {
            const response = await fetch(FLASK_CADASTRO_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Envia os 4 campos que seu backend deve precisar (Nome, Email, Telefone, Endereço, Senha)
                // ⚠️ Se seu Flask não aceitar Telefone e Endereço, você pode removê-los aqui
                body: JSON.stringify({ 
                    nome: nome,
                    email: email, 
                    telefone: telefone,
                    endereco: endereco,
                    senha: password // Certificamos que esta chave é 'senha'
                }), 
            });

            if (response.ok || response.status === 201) { 
                showToast('Cadastro Sucesso!', 'Sua conta foi criada. Faça login para continuar.', false);
                
                setTimeout(() => {
                    router.push('/login'); 
                }, 1500); 
                
            } else { 
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Erro ao cadastrar. Verifique os dados.';
                showToast('Falha no Cadastro', errorMessage, true);
            }

        } catch (error) {
            console.error('Erro na requisição:', error);
            showToast('Erro de Conexão', 'Não foi possível conectar ao servidor. Verifique se o Flask está rodando.', true);
        } finally {
            setIsLoading(false);
        }
    };
    
    // 3. O JSX com classes Tailwind (Layout idêntico ao Login)
    return (
        <>
            

            {/* CONTAINER PRINCIPAL DO CADASTRO */}
            <div className="flex-grow flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_center,_#1a1a1a_0%,_#0a0a0a_100%)] min-h-[calc(100vh-80px)]">
                <div className="w-full max-w-sm flex flex-col gap-8 animate-fadeIn-slow">
                    <div className="text-center">
                        <img src="/logoicone/logo_codeburguer.png" alt="Code Burger" className="h-16 w-16 mx-auto mb-4 rounded-full" />
                        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-1">
                            Code Burger
                        </h1>
                        <p className="text-cb-text-muted text-sm">Crie sua conta e faça parte da nossa comunidade</p>
                    </div>

                    {/* CARD DO FORMULÁRIO */}
                    <div className="bg-cb-card-bg border border-cb-border rounded-xl shadow-glow overflow-hidden animate-fadeIn-fast">
                        <div className="p-6 pb-0 text-center">
                            <h2 className="text-2xl font-semibold mb-2">Cadastro</h2>
                            <p className="text-cb-text-muted text-sm">Preencha os dados para criar sua conta</p>
                        </div>
                        
                        <div className="p-6">
                            <form id="cadastroForm" className="flex flex-col space-y-6" onSubmit={handleSubmit}> 
                                {/* Campo Nome */}
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="nome" className="text-sm font-medium text-white">Nome Completo</label>
                                    <input 
                                        type="text" 
                                        id="nome" 
                                        className="w-full p-3 border border-cb-border rounded-lg bg-cb-background text-white text-sm focus:outline-none focus:border-cb-primary focus:shadow-[0_0_0_3px_rgba(255,107,53,0.1)] transition duration-300"
                                        placeholder="Seu nome completo" 
                                        required 
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Campo Email */}
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-white">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        className="w-full p-3 border border-cb-border rounded-lg bg-cb-background text-white text-sm focus:outline-none focus:border-cb-primary focus:shadow-[0_0_0_3px_rgba(255,107,53,0.1)] transition duration-300"
                                        placeholder="seu@email.com" 
                                        required 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Campo Telefone */}
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="telefone" className="text-sm font-medium text-white">Telefone</label>
                                    <input 
                                        type="tel" 
                                        id="telefone" 
                                        className="w-full p-3 border border-cb-border rounded-lg bg-cb-background text-white text-sm focus:outline-none focus:border-cb-primary focus:shadow-[0_0_0_3px_rgba(255,107,53,0.1)] transition duration-300"
                                        placeholder="Digite 8 números" 
                                        required 
                                        value={telefone}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, ''); // remove caracteres não numéricos
                                            if (value.length <= 11) setTelefone(value); // limita a 8 dígitos
                                        }}
                                        maxLength={11} // previne digitar mais que 8 números
                                        disabled={isLoading}
                                    />

                                </div>
                                
                                {/* Campo Endereço */}
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="endereco" className="text-sm font-medium text-white">Endereço</label>
                                    <input 
                                        type="text" 
                                        id="endereco" 
                                        className="w-full p-3 border border-cb-border rounded-lg bg-cb-background text-white text-sm focus:outline-none focus:border-cb-primary focus:shadow-[0_0_0_3px_rgba(255,107,53,0.1)] transition duration-300"
                                        placeholder="Rua Galvão Bueno" 
                                        required 
                                        value={endereco}
                                        onChange={(e) => setEndereco(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Campo Senha */}
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="password" className="text-sm font-medium text-white">Senha</label>
                                    <input 
                                        type="password" 
                                        id="senha" 
                                        className="w-full p-3 border border-cb-border rounded-lg bg-cb-background text-white text-sm focus:outline-none focus:border-cb-primary focus:shadow-[0_0_0_3px_rgba(255,107,53,0.1)] transition duration-300"
                                        placeholder="••••••••" 
                                        required 
                                        minLength={6}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Campo Confirmar Senha */}
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="confirmPassword" className="text-sm font-medium text-white">Confirmar senha</label>
                                    <input 
                                        type="password" 
                                        id="confirmPassword" 
                                        className="w-full p-3 border border-cb-border rounded-lg bg-cb-background text-white text-sm focus:outline-none focus:border-cb-primary focus:shadow-[0_0_0_3px_rgba(255,107,53,0.1)] transition duration-300"
                                        placeholder="••••••••" 
                                        required 
                                        minLength={6}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* BOTÃO DE ENVIO */}
                                <button 
                                    type="submit" 
                                    className={`w-full p-3 border-none rounded-lg text-sm font-medium text-white bg-gradient-primary shadow-lg shadow-cb-primary/[.3] hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Cadastrando...' : 'Criar conta'}
                                </button>
                            </form>

                            {/* Link para Login */}
                            <div className="mt-6 text-center">
                                <p className="text-cb-text-muted text-xs">
                                    Já tem uma conta? 
                                    <Link href="/login" className="text-cb-primary font-medium ml-1 hover:underline transition">Fazer login</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TOAST de feedback */}
            <div 
                id="toast" 
                className={`fixed top-8 right-8 bg-cb-card-bg border rounded-lg p-4 max-w-xs shadow-xl transition-all duration-300 ease-in-out z-50 transform ${message ? 'translate-x-0' : 'translate-x-full hidden'} ${message?.isError ? 'border-red-600' : 'border-cb-border'}`}
            >
                <div className="flex flex-col gap-1">
                    <h3 className={`text-base font-semibold ${message?.isError ? 'text-red-400' : 'text-white'}`}>
                        {message?.title}
                    </h3>
                    <p className="text-sm text-cb-text-muted">
                        {message?.description}
                    </p>
                </div>
            </div>
        </>
    )
}