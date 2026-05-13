import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import NovaReceita from './pages/NovaReceita';
import NovaDespesa from './pages/NovaDespesa';
import Login from './pages/Login';
import EditarReceita from './pages/EditarReceita';
import EditarDespesa from './pages/EditarDespesa';
import Perfil from './pages/Perfil';
import Metas from './pages/Metas';
import NotFound from './pages/NotFound';

const NavBar = () => {
  const navigate = useNavigate();
  const nomeUsuario = localStorage.getItem('usuarioNome');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!localStorage.getItem('usuarioId')) return null;

  return (
    <nav className="bg-gradient-to-r from-[#C4DEA4] to-[#A7D489] shadow-[0_4px_15px_rgba(167,212,137,0.4)] py-4">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        

        <Link to="/dashboard" className="text-3xl font-extrabold text-[#2c3e50] tracking-tight mb-4 md:mb-0">
          Fluxy
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-lg font-medium text-[#2c3e50] hover:text-white transition-colors">Painel</Link>
          <Link to="/nova-receita" className="text-lg font-medium text-[#2c3e50] hover:text-white transition-colors">+ Receita</Link>
          <Link to="/nova-despesa" className="text-lg font-medium text-[#2c3e50] hover:text-white transition-colors">+ Despesa</Link>
          <Link to="/metas" className="text-lg font-medium text-[#2c3e50] hover:text-white transition-colors">Metas</Link> 
          <Link to="/perfil" className="text-lg font-medium text-[#2c3e50] hover:text-white transition-colors">Minha Conta</Link>
        </div>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <span className="font-semibold text-[#2c3e50]">Olá, {nomeUsuario}</span>
          <button 
            onClick={handleLogout} 
            className="border-2 border-[#2c3e50] text-[#2c3e50] hover:bg-[#2c3e50] hover:text-white px-4 py-1.5 rounded-full font-bold transition-colors"
          >
            Sair
          </button>
        </div>

      </div>
    </nav>
  );
};

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/nova-receita" element={<NovaReceita />} />
        <Route path="/nova-despesa" element={<NovaDespesa />} />
        <Route path="/editar-receita/:id" element={<EditarReceita />} />
        <Route path="/editar-despesa/:id" element={<EditarDespesa />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/metas" element={<Metas />} /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;