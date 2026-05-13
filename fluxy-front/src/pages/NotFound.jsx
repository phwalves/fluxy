import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="min-h-[80vh] flex flex-col justify-center items-center font-sans p-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-blue-100">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">Página não encontrada</h2>
        <p className="text-gray-500 mt-2 mb-8">Parece que você se perdeu no fluxo financeiro do sistema.</p>
        
        <Link 
          to="/dashboard" 
          className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md"
        >
          Voltar em Segurança para o Dashboard
        </Link>
      </div>
    </main>
  );
};

export default NotFound;