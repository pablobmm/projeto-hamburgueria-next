'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const FLASK_LOGIN_URL = 'http://127.0.0.1:5002/login';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(FLASK_LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha: password }),
      });

      if (response.ok) {
        showToast('Sucesso!', 'Login realizado com sucesso! Redirecionando...', false);
        setTimeout(() => router.push('/'), 1500);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Credenciais inválidas ou erro desconhecido.';
        showToast('Falha no Login', errorMessage, true);
      }
    } catch (error) {
      showToast('Erro de Conexão', 'Não foi possível conectar ao servidor. Verifique o Flask.', true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4 bg-[radial-gradient(ellipse_at_center,_#1a1a1a_0%,_#0a0a0a_100%)]">
        <div className="w-full max-w-md flex flex-col gap-4">
          <div className="text-center">
            <img
              src="/assets/logo_codeburguer.png"
              alt="Code Burger"
              className="h-16 w-16 mx-auto mb-4 rounded-full"
            />
            <h1 className="text-3xl font-bold text-[#FF914D] mb-2">Code Burger</h1>
            <p className="text-gray-400 text-sm mt-0">Entre na sua conta para continuar</p>
          </div>

          <div className="bg-[#1b1b1b] border border-[#333333] rounded-xl shadow-[0_0_20px_rgba(255,107,53,0.4)] overflow-hidden">
            <div className="px-6 pb-6 pt-4">
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="seu@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full p-3 rounded-lg bg-[#333333] border border-[#444444] text-white text-sm focus:outline-none focus:border-[#FF914D] focus:ring-1 focus:ring-[#FF914D] transition"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-white">Senha</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full p-3 rounded-lg bg-[#333333] border border-[#444444] text-white text-sm focus:outline-none focus:border-[#FF914D] focus:ring-1 focus:ring-[#FF914D] transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full p-3 rounded-lg text-white font-medium text-sm bg-gradient-to-r from-[#FF914D] to-[#FFBB77] shadow-lg shadow-[#FF914D]/30 hover:shadow-xl hover:scale-[1.01] transition duration-300 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400 text-xs">
                  Não tem uma conta?
                  <Link href="/cadastro" className="text-[#FF914D] font-medium ml-1 hover:underline">
                    Cadastre-se
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div
        id="toast"
        className={`fixed top-8 right-8 bg-[#1b1b1b] border rounded-lg p-4 max-w-xs shadow-xl transition-transform duration-300 ease-in-out z-50 transform ${message ? 'translate-x-0' : 'translate-x-full hidden'} ${message?.isError ? 'border-red-600' : 'border-[#333333]'}`}
      >
        <div className="flex flex-col gap-1">
          <h3 className={`text-base font-semibold ${message?.isError ? 'text-red-400' : 'text-white'}`}>
            {message?.title}
          </h3>
          <p className="text-sm text-gray-400">{message?.description}</p>
        </div>
      </div>
    </>
  );
}
