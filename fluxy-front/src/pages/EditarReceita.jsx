import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const EditarReceita = () => {
  const { id } = useParams();
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const carregarReceita = async () => {
      try {
        const response = await api.get(`/receitas/${id}`);
        setDescricao(response.data.descricao);
        setValor(response.data.valor);
        setData(response.data.data);
      } catch (error) {
        console.error("Erro ao carregar receita:", error);
      }
    };
    carregarReceita();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuarioId = localStorage.getItem('usuarioId');
    try {
      await api.put(`/receitas/${id}`, {
        id,
        descricao,
        valor,
        data,
        usuario: { id: usuarioId }
      });
      navigate('/dashboard');
    } catch (error) {
      console.error("Erro ao atualizar receita:", error);
    }
  };

  return (
    <main className="container mx-auto p-8 max-w-2xl font-sans mt-8">
      <div className="bg-[#ECEBC9] rounded-3xl shadow-sm p-8 md:p-10 border border-[#D5E7B8]">
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-3 h-10 bg-[#27ae60] rounded-full"></div>
          <h1 className="text-3xl font-extrabold text-[#2c3e50]">Editar Receita</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-bold text-[#4a4a4a] mb-2 ml-1">Descrição</label>
            <input 
              type="text" 
              value={descricao} 
              onChange={(e) => setDescricao(e.target.value)} 
              required 
              className="w-full px-5 py-3 rounded-2xl border-none bg-white/80 focus:bg-white focus:ring-4 focus:ring-[#27ae60]/30 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#4a4a4a] mb-2 ml-1">Valor (R$)</label>
              <input 
                type="number" 
                step="0.01"
                value={valor} 
                onChange={(e) => setValor(e.target.value)} 
                required 
                className="w-full px-5 py-3 rounded-2xl border-none bg-white/80 focus:bg-white focus:ring-4 focus:ring-[#27ae60]/30 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#4a4a4a] mb-2 ml-1">Data</label>
              <input 
                type="date" 
                value={data} 
                onChange={(e) => setData(e.target.value)} 
                required 
                className="w-full px-5 py-3 rounded-2xl border-none bg-white/80 focus:bg-white focus:ring-4 focus:ring-[#27ae60]/30 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t border-[#D5E7B8]">
            <button type="submit" className="flex-1 bg-[#27ae60] hover:bg-[#219653] text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-md">
              Atualizar Dados
            </button>
            <button type="button" onClick={() => navigate('/dashboard')} className="px-8 py-4 bg-white/50 hover:bg-white text-[#4a4a4a] font-bold rounded-2xl transition-all">
              Voltar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditarReceita;