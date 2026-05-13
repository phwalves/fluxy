import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
  const [receitas, setReceitas] = useState([]);
  const [despesas, setDespesas] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const usuarioId = localStorage.getItem('usuarioId'); 
        const resReceitas = await api.get(`/receitas/usuario/${usuarioId}`);
        const resDespesas = await api.get(`/despesas/usuario/${usuarioId}`);
        setReceitas(resReceitas.data);
        setDespesas(resDespesas.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };
    carregarDados();
  }, []);

  const handleDeleteReceita = async (id) => {
    if (window.confirm('Excluir esta receita?')) {
      await api.delete(`/receitas/${id}`);
      setReceitas(receitas.filter(r => r.id !== id));
    }
  };

  const handleDeleteDespesa = async (id) => {
    if (window.confirm('Excluir esta despesa?')) {
      await api.delete(`/despesas/${id}`);
      setDespesas(despesas.filter(d => d.id !== id));
    }
  };

  const totalReceitas = receitas.reduce((acc, atual) => acc + Number(atual.valor), 0);
  const totalDespesas = despesas.reduce((acc, atual) => acc + Number(atual.valor), 0);
  const saldoFinal = totalReceitas - totalDespesas;

  const movimentacoes = [
    ...receitas.map(r => ({ ...r, tipo: 'Receita' })),
    ...despesas.map(d => ({ ...d, tipo: 'Despesa' }))
  ].sort((a, b) => new Date(b.data) - new Date(a.data));

  return (
    <main className="container mx-auto p-8 max-w-6xl font-sans">

      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#4a4a4a]">Meu Painel</h2>
        <p className="text-[#4a4a4a] opacity-80 mt-1">Tenha uma visão geral das suas finanças.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-[#A7D489] rounded-2xl p-6 shadow-sm">
          <h5 className="text-[#4a4a4a] font-bold text-lg mb-2">Saldo Atual</h5>
          <p className="text-4xl font-bold text-[#2c3e50]">R$ {saldoFinal.toFixed(2)}</p>
        </div>

        <div className="bg-[#ECEBC9] rounded-2xl p-6 shadow-sm">
          <h5 className="text-[#27ae60] font-bold text-lg mb-2">Receitas</h5>
          <p className="text-4xl font-bold text-[#2c3e50]">R$ {totalReceitas.toFixed(2)}</p>
        </div>

        <div className="bg-[#ECEBC9] rounded-2xl p-6 shadow-sm">
          <h5 className="text-[#e74c3c] font-bold text-lg mb-2">Despesas</h5>
          <p className="text-4xl font-bold text-[#2c3e50]">R$ {totalDespesas.toFixed(2)}</p>
        </div>

      </div>

      <div className="mt-10 bg-white rounded-2xl shadow-sm overflow-hidden">
        
        <div className="bg-white px-6 py-5 border-b border-gray-100">
          <h5 className="font-extrabold text-[#4a4a4a] text-xl">Últimas Movimentações</h5>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-semibold">Data</th>
                <th className="px-6 py-4 font-semibold">Descrição</th>
                <th className="px-6 py-4 font-semibold">Categoria</th>
                <th className="px-6 py-4 font-semibold text-right">Valor</th>
                <th className="px-6 py-4 font-semibold text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#4a4a4a]">
              {movimentacoes.length === 0 && (
                <tr><td colSpan="5" className="text-center py-8 text-gray-400">Nenhuma movimentação registada.</td></tr>
              )}
              
              {movimentacoes.map((mov) => (
                <tr key={`${mov.tipo}-${mov.id}`} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mov.data}</td>
                  <td className="px-6 py-4 font-bold">{mov.descricao}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${mov.tipo === 'Receita' ? 'bg-[#27ae60]' : 'bg-[#e74c3c]'}`}>
                      {mov.tipo}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-bold whitespace-nowrap ${mov.tipo === 'Receita' ? 'text-[#27ae60]' : 'text-[#e74c3c]'}`}>
                    {mov.tipo === 'Receita' ? '+' : '-'} R$ {Number(mov.valor).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {mov.tipo === 'Receita' ? (
                      <div className="flex justify-center gap-2">
                        <Link to={`/editar-receita/${mov.id}`} className="px-3 py-1 bg-yellow-100 text-yellow-700 font-bold rounded hover:bg-yellow-200 transition">Editar</Link>
                        <button onClick={() => handleDeleteReceita(mov.id)} className="px-3 py-1 bg-red-100 text-red-700 font-bold rounded hover:bg-red-200 transition">X</button>
                      </div>
                    ) : (
                      <div className="flex justify-center gap-2">
                        <Link to={`/editar-despesa/${mov.id}`} className="px-3 py-1 bg-yellow-100 text-yellow-700 font-bold rounded hover:bg-yellow-200 transition">Editar</Link>
                        <button onClick={() => handleDeleteDespesa(mov.id)} className="px-3 py-1 bg-red-100 text-red-700 font-bold rounded hover:bg-red-200 transition">X</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
};

export default Home;