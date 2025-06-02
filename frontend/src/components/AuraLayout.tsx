import React from "react";

export default function VisageDockLayout() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white font-sans flex flex-col items-center py-10 px-4 md:px-10">
      {/* Header */}
      <header className="mb-12 w-full max-w-6xl">
        <h1 className="text-3xl font-bold">Visage</h1>
        <p className="text-sm text-white/50">Transforme reuniões em ação</p>
      </header>

      {/* Container Principal */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8">
        {/* Coluna principal */}
        <div className="flex-1 space-y-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Upload da Reunião</h2>
            <input type="file" className="w-full px-4 py-2 bg-white/10 rounded-md text-sm" />
            <button className="mt-4 w-full px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition text-white">
              Transformar Reunião
            </button>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Transcrição</h2>
            <textarea
              rows={6}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-sm text-white placeholder-white/40"
              placeholder="Transcrição gerada..."
            ></textarea>
            <button className="mt-4 w-full px-6 py-2 rounded-md bg-green-600 hover:bg-green-700 transition text-white">
              Analisar com IA
            </button>
          </div>
        </div>

        {/* DockBar lateral */}
        <div className="w-full md:w-64 bg-white/5 border border-white/10 rounded-xl p-6 h-fit space-y-3">
          <h2 className="text-lg font-semibold mb-4 text-white/80">Ações</h2>
          <button className="w-full text-left px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition">Criar Plano de Ação</button>
          <button className="w-full text-left px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition">Exportar PDF</button>
          <button className="w-full text-left px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition">Enviar por E-mail</button>
          <button className="w-full text-left px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition">Salvar Histórico</button>
          <button className="w-full text-left px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition">Ver Histórico</button>
        </div>
      </div>
    </div>
  );
}
