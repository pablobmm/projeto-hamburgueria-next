// src/app/login/page.jsx

// 1. Usamos 'use client' porque esta página tem formulário e interatividade (hooks do React)
'use client'; 

import Link from 'next/link';
// Importamos os hooks necessários para o formulário
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

// 🚨🚨 URL do seu backend Flask (MUITO IMPORTANTE!)
const FLASK_LOGIN_URL = 'http://127.0.0.1:5000/login'; 

export default function LoginPage() {
    // 2. Estado para guardar o que o usuário digita
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Estado para controlar o botão de envio
    const [isLoading, setIsLoading] = useState(false);
    // Estado para mostrar mensagens de feedback (sucesso/erro)
    const [message, setMessage] = useState(null); 
    
    const router = useRouter(); 

    // 3. Função para mostrar as notificações flutuantes (Toast)
    const showToast = (title, description, isError = false) => {
        setMessage({ title, description, isError });
        const toastElement = document.getElementById('toast');
        if (toastElement) {
            // Lógica para mostrar o toast (Tailwind classes)
            toastElement.classList.remove('hidden', 'translate-x-full');
            toastElement.classList.add('translate-x-0');
            
            setTimeout(() => {
                // Lógica para esconder o toast
                toastElement.classList.remove('translate-x-0');
                toastElement.classList.add('translate-x-full');
                setTimeout(() => toastElement.classList.add('hidden'), 300);
            }, 5000); 
        }
    };

    // 4. FUNÇÃO PRINCIPAL: O que acontece quando você clica em 'Entrar'
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        setIsLoading(true);
        setMessage(null); 

        try {
            // Chamada de Rede (Fetch) para o seu servidor Flask
            const response = await fetch(FLASK_LOGIN_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // 🚨🚨 Envia os dados. Se o seu Flask espera 'password', mude 'senha: password' para 'password: password'
                body: JSON.stringify({ email: email, senha: password }), 
            });

            if (response.ok) { 
                const data = await response.json();
                console.log('Login Sucesso:', data); 
                // Lógica para salvar o token/sessão vai aqui!
                
                showToast('Sucesso!', 'Login realizado com sucesso! Redirecionando...', false);
                
                setTimeout(() => {
                    router.push('/'); // Redireciona para a página inicial
                }, 1500); 
                
            } else { 
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Credenciais inválidas ou erro desconhecido.';
                showToast('Falha no Login', errorMessage, true);
            }

        } catch (error) {
            console.error('Erro na requisição:', error);
            showToast('Erro de Conexão', 'Não foi possível conectar ao servidor. Verifique o Flask.', true);
        } finally {
            setIsLoading(false);
        }
    };
    
    // 5. O JSX (HTML com classes Tailwind) para o visual
    return (
        <>
            {/* O HEADER está aqui, mas o ideal é movê-lo para o layout.js */}
            <header className="bg-cb-background">
                <div className="container mx-auto flex items-center pt-4 pb-8 px-12 max-w-7xl">
                    <div className="logo">
                        <Link href="/" className="font-calistoga text-2xl text-white no-underline">
                            Code <span className="text-cb-primary">•</span> Burger
                        </Link>
                    </div>
                    {/* Navegação principal - Classes Tailwind */}
                    <nav className="flex-1 flex items-center hidden md:flex">
                        <ul className="flex-1 flex space-x-8 ml-8">
                            <li><Link href="/" className="text-white hover:text-cb-text-muted no-underline">Início</Link></li>
                            <li><Link href="" className="text-white hover:text-cb-text-muted no-underline">Burgers</Link></li>
                            <li><Link href="" className="text-white hover:text-cb-text-muted no-underline">Contato</Link></li>
                        </ul>
                        <div className="flex space-x-4">
                            <Link href="" className="border border-white py-3 px-6 rounded-md text-white no-underline hover:border-cb-text-muted hover:text-cb-text-muted transition duration-300">Fazer pedido</Link>
                            <Link href="/login" className="border border-white py-3 px-6 rounded-md text-white no-underline hover:border-cb-text-muted hover:text-cb-text-muted transition duration-300">Login</Link>
                            <Link href="/cadastro" className="border border-white py-3 px-6 rounded-md text-white no-underline hover:border-cb-text-muted hover:text-cb-text-muted transition duration-300">Cadastro</Link>
                        </div>
                    </nav>
                    <div className="md:hidden flex-1 flex justify-end">
                        <div className="w-8 h-8 flex flex-col justify-between cursor-pointer">
                            <div className="h-1 bg-white"></div>
                            <div className="h-1 bg-white"></div>
                            <div className="h-1 bg-white"></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* CONTAINER PRINCIPAL DO LOGIN */}
            <div className="flex-grow flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_center,_#1a1a1a_0%,_#0a0a0a_100%)] min-h-[calc(100vh-80px)]">
                <div className="w-full max-w-sm flex flex-col gap-8 animate-fadeIn-slow">
                    {/* Título e Logo */}
                    <div className="text-center">
                        <img src="/logoicone/logo_codeburguer.png" alt="Code Burger" className="h-16 w-16 mx-auto mb-4 rounded-full" />
                        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-1">
                            Code Burger
                        </h1>
                        <p className="text-cb-text-muted text-sm">Entre na sua conta para continuar</p>
                    </div>

                    {/* CARD DO FORMULÁRIO */}
                    <div className="bg-cb-card-bg border border-cb-border rounded-xl shadow-glow overflow-hidden animate-fadeIn-fast">
                        <div className="p-6 pb-0 text-center">
                            <h2 className="text-2xl font-semibold mb-2">Login</h2>
                            <p className="text-cb-text-muted text-sm">Digite suas credenciais para acessar</p>
                        </div>
                        
                        <div className="p-6">
                            {/* Formulário com o evento de envio */}
                            <form id="loginForm" className="flex flex-col space-y-6" onSubmit={handleSubmit}> 
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
                                
                                {/* Campo Senha */}
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="password" className="text-sm font-medium text-white">Senha</label>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        className="w-full p-3 border border-cb-border rounded-lg bg-cb-background text-white text-sm focus:outline-none focus:border-cb-primary focus:shadow-[0_0_0_3px_rgba(255,107,53,0.1)] transition duration-300"
                                        placeholder="••••••••" 
                                        required 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* BOTÃO DE ENVIO */}
                                <button 
                                    type="submit" 
                                    className={`w-full p-3 border-none rounded-lg text-sm font-medium text-white bg-gradient-primary shadow-lg shadow-cb-primary/[.3] hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Entrando...' : 'Entrar'}
                                </button>
                            </form>

                            {/* Link para Cadastro */}
                            <div className="mt-6 text-center">
                                <p className="text-cb-text-muted text-xs">
                                    Não tem uma conta? 
                                    <Link href="/cadastro" className="text-cb-primary font-medium ml-1 hover:underline transition">Cadastre-se</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TOAST de feedback (oculto por padrão) */}
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