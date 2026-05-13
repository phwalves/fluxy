import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get('/usuarios');
      const usuarios = response.data;
      const usuarioLogado = usuarios.find(u => u.email === email && u.senha === senha);

      if (usuarioLogado) {
        localStorage.setItem('usuarioId', usuarioLogado.id);
        localStorage.setItem('usuarioNome', usuarioLogado.nome);
        navigate('/dashboard');
      } else {
        alert('E-mail ou senha inválidos!');
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <main className="min-h-screen bg-[#F6F6DB] flex flex-col justify-center items-center font-sans p-4">
      <div className="w-full max-w-md bg-[#ECEBC9] rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] p-10 border border-[#D5E7B8]">
        
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black text-[#2c3e50] tracking-tighter mb-2">Fluxy</h1>
          <div className="h-1.5 w-16 bg-[#A7D489] mx-auto rounded-full"></div>
          <p className="text-[#4a4a4a] font-medium mt-4">Gestão Financeira Inteligente</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-bold text-[#4a4a4a] mb-2 ml-1">E-mail</label>
            <input 
              type="email" 
              placeholder="seu@email.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full px-5 py-3 rounded-2xl border-none bg-white/80 focus:bg-white focus:ring-4 focus:ring-[#A7D489]/30 outline-none transition-all placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#4a4a4a] mb-2 ml-1">Palavra-passe</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              required 
              className="w-full px-5 py-3 rounded-2xl border-none bg-white/80 focus:bg-white focus:ring-4 focus:ring-[#A7D489]/30 outline-none transition-all placeholder-gray-400"
            />
          </div>

          <button 
            type="submit" 
            className="w-full mt-4 bg-gradient-to-r from-[#C4DEA4] to-[#A7D489] text-[#2c3e50] font-black text-lg py-4 px-4 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
          >
            ENTRAR
          </button>
        </form>

        <div className="mt-8 text-center">
            <p className="text-xs text-[#4a4a4a] opacity-60 uppercase tracking-widest font-bold">
                Jeito Fluxy de ser
            </p>
        </div>
      </div>
    </main>
  );
};

export default Login;