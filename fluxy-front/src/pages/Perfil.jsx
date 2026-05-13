import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Perfil = () => {
  const usuarioId = localStorage.getItem('usuarioId');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senhaOriginal, setSenhaOriginal] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const buscarDadosUsuario = async () => {
      try {
        const response = await api.get(`/usuarios/${usuarioId}`);
        setNome(response.data.nome);
        setEmail(response.data.email);
        setCpf(response.data.cpf);
        setSenhaOriginal(response.data.senha);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      }
    };
    buscarDadosUsuario();
  }, [usuarioId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const usuarioAtualizado = {
        id: usuarioId,
        nome,
        email,
        cpf,
        senha: senhaOriginal
      };

      await api.put(`/usuarios/${usuarioId}`, usuarioAtualizado);
      localStorage.setItem('usuarioNome', nome);
      
      setMensagem('Conta atualizada com sucesso!');
      setTimeout(() => setMensagem(''), 3000);
      
      window.location.reload(); 
    } catch (error) {
      setMensagem('Erro ao atualizar perfil. Verifique o console.');
    }
  };

  return (
    <main className="container mx-auto p-8 max-w-2xl font-sans mt-8">
      <div className="bg-[#ECEBC9] rounded-3xl shadow-sm p-8 md:p-10 border border-[#D5E7B8]">
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-3 h-10 bg-gradient-to-b from-[#C4DEA4] to-[#A7D489] rounded-full"></div>
          <h1 className="text-3xl font-extrabold text-[#2c3e50]">Minha Conta</h1>
        </div>
        
        {mensagem && (
          <div className="mb-8 p-4 bg-[#D5E7B8] text-[#2c3e50] border border-[#A7D489] rounded-2xl font-bold text-center">
            {mensagem}
          </div>
        )}

        <form onSubmit={handleUpdate} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-bold text-[#4a4a4a] mb-2 ml-1">Nome Completo</label>
            <input 
              type="text" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              required
              className="w-full px-5 py-3 rounded-2xl border-none bg-white/80 focus:bg-white focus:ring-4 focus:ring-[#A7D489]/50 outline-none transition-all text-[#4a4a4a]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#4a4a4a] mb-2 ml-1">E-mail de Acesso</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
              className="w-full px-5 py-3 rounded-2xl border-none bg-white/80 focus:bg-white focus:ring-4 focus:ring-[#A7D489]/50 outline-none transition-all text-[#4a4a4a]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#4a4a4a] mb-2 ml-1">CPF</label>
            <input 
              type="text" 
              value={cpf || ''} 
              onChange={(e) => setCpf(e.target.value)} 
              placeholder="000.000.000-00"
              className="w-full px-5 py-3 rounded-2xl border-none bg-white/80 focus:bg-white focus:ring-4 focus:ring-[#A7D489]/50 outline-none transition-all text-[#4a4a4a]"
            />
          </div>

          <div className="mt-6 pt-6 border-t border-[#D5E7B8]">
            <button type="submit" className="w-full bg-gradient-to-r from-[#C4DEA4] to-[#A7D489] text-[#2c3e50] font-black text-lg py-4 px-4 rounded-2xl transition-all shadow-md hover:shadow-lg hover:scale-[1.01]">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Perfil;