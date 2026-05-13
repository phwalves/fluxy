import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Metas = () => {
  const [metas, setMetas] = useState([]);
  const [nmMeta, setNmMeta] = useState('');
  const [vlObjetivo, setVlObjetivo] = useState('');
  const [vlAcumulado, setVlAcumulado] = useState('');
  const [dtPrazo, setDtPrazo] = useState('');

  const usuarioId = localStorage.getItem('usuarioId');


  useEffect(() => {
    const carregarMetas = async () => {
      try {
        const response = await api.get(`/metas/usuario/${usuarioId}`);
        setMetas(response.data);
      } catch (error) {
        console.error("Erro ao buscar metas:", error);
      }
    };
    if (usuarioId) carregarMetas();
  }, [usuarioId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const novaMeta = {
        nmMeta,
        vlObjetivo: Number(vlObjetivo),
        vlAcumulado: Number(vlAcumulado || 0),
        dtPrazo: dtPrazo ? dtPrazo : null,
        usuario: { id: usuarioId }
      };
      
      const response = await api.post('/metas', novaMeta);
      setMetas([...metas, response.data]);
      setNmMeta('');
      setVlObjetivo('');
      setVlAcumulado('');
      setDtPrazo('');
    } catch (error) {
      console.error("Erro ao criar meta:", error);
      alert("Erro ao salvar a meta. Verifique o console.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja excluir esta meta? O dinheiro não será apagado, apenas a meta.')) {
      try {
        await api.delete(`/metas/${id}`);
        setMetas(metas.filter(m => m.id !== id));
      } catch (error) {
        console.error("Erro ao excluir meta:", error);
      }
    }
  };

  return (
    <main className="container mx-auto p-8 max-w-5xl font-sans mt-4">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#4a4a4a]">Minhas Metas</h2>
        <p className="text-[#4a4a4a] opacity-80 mt-1">Acompanhe os seus objetivos financeiros e conquiste os seus sonhos.</p>
      </div>

      <div className="bg-[#ECEBC9] rounded-3xl shadow-sm p-8 md:p-10 border border-[#D5E7B8] mb-10">
        <div className="flex items-center gap-4 mb-6 border-b border-[#D5E7B8] pb-4">
          <div className="w-3 h-8 bg-gradient-to-b from-[#C4DEA4] to-[#A7D489] rounded-full"></div>
          <h3 className="text-2xl font-bold text-[#2c3e50]">Criar Nova Meta</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label className="block text-sm font-bold text-[#4a4a4a] mb-2 ml-1">Nome da Meta</label>
              <input 
                type="text" 
                value={nmMeta} 
                onChange={(e) => setNmMeta(e.target.value)} 
                required 
                placeholder="Ex: Viagem para Europa, Reserva de Emergência..." 
                className="w-full px-5 py-3 rounded-2xl border-none bg-white/80 focus:bg-white focus:ring-4 focus:ring-[#A7D489]/50 outline-none transition-all text-[#4a4a4a]" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-[#4a4a4a] mb-2 ml-1">Prazo (Opcional)</label>
              <input 
                type="date" 
                value={dtPrazo} 
                onChange={(e) => setDtPrazo(e.target.value)} 
                className="w-full px-5 py-3 rounded-2xl border-none bg-white/80 focus:bg-white focus:ring-4 focus:ring-[#A7D489]/50 outline-none transition-all text-[#4a4a4a]" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-[#4a4a4a] mb-2 ml-1">Valor Objetivo (R$)</label>
              <input 
                type="number" 
                step="0.01" 
                value={vlObjetivo} 
                onChange={(e) => setVlObjetivo(e.target.value)} 
                required 
                placeholder="0.00" 
                className="w-full px-5 py-3 rounded-2xl border-none bg-white/80 focus:bg-white focus:ring-4 focus:ring-[#A7D489]/50 outline-none transition-all text-[#4a4a4a]" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-[#4a4a4a] mb-2 ml-1">Já tenho guardado (R$)</label>
              <input 
                type="number" 
                step="0.01" 
                value={vlAcumulado} 
                onChange={(e) => setVlAcumulado(e.target.value)} 
                placeholder="0.00" 
                className="w-full px-5 py-3 rounded-2xl border-none bg-white/80 focus:bg-white focus:ring-4 focus:ring-[#A7D489]/50 outline-none transition-all text-[#4a4a4a]" 
              />
            </div>

          </div>
          
          <button type="submit" className="mt-2 bg-gradient-to-r from-[#C4DEA4] to-[#A7D489] text-[#2c3e50] font-black py-4 px-8 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.01] transition-all w-full md:w-auto self-end">
            + Guardar Meta
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {metas.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-12 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium">Nenhuma meta definida. Comece a planear o seu futuro!</p>
          </div>
        )}
        
        {metas.map((meta) => {
          const porcentagem = meta.vlObjetivo > 0 
            ? Math.min(100, Math.round((meta.vlAcumulado / meta.vlObjetivo) * 100)) 
            : 0;
          
          return (
            <div key={meta.id} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-extrabold text-[#2c3e50]">{meta.nmMeta}</h4>
                  {meta.dtPrazo && <p className="text-sm font-medium text-gray-400 mt-1">Para: {meta.dtPrazo}</p>}
                </div>
                <button 
                  onClick={() => handleDelete(meta.id)} 
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white font-bold transition-colors"
                  title="Excluir Meta"
                >
                  X
                </button>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm font-bold text-[#4a4a4a] mb-3">
                  <span>Guardado: R$ {Number(meta.vlAcumulado).toFixed(2)}</span>
                  <span>Alvo: R$ {Number(meta.vlObjetivo).toFixed(2)}</span>
                </div>
                
                <div className="w-full bg-gray-100 rounded-full h-4 mb-2 overflow-hidden shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-[#A7D489] to-[#27ae60] h-4 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${porcentagem}%` }}
                  ></div>
                </div>
                
                <p className="text-right text-sm font-black text-[#27ae60] mt-1">{porcentagem}% concluído</p>
              </div>
              
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Metas;