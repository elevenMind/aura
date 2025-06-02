import React, { useState } from "react";
import {
  FileText,
  Upload,
  Zap,
  Mail,
  Clock,
  History,
  ChevronDown,
} from "lucide-react";
import html2pdf from "html2pdf.js";
import MindMapViewer from "./MindMapViewer";

export default function AuraDockLayout() {
  const [uploading, setUploading] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [actionPlan, setActionPlan] = useState({
    resumo: [],
    tarefas: [],
    proximos: [],
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMindMap, setShowMindMap] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showPDFDropdown, setShowPDFDropdown] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const savePlanToLocalStorage = () => {
    if (!transcription || actionPlan.resumo.length === 0) {
      alert("Nada para salvar.");
      return;
    }

    const timestamp = new Date().toLocaleString("pt-BR");
    const newEntry = {
      timestamp,
      transcription,
      plan: actionPlan,
      resumo: actionPlan.resumo[0] || "(sem resumo)",
    };

    const history = JSON.parse(localStorage.getItem("visage_history") || "[]");
    localStorage.setItem("visage_history", JSON.stringify([newEntry, ...history]));
    alert("Plano salvo no histórico!");
  };

  const getPlanHistory = () => {
    return JSON.parse(localStorage.getItem("visage_history") || "[]");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadSuccess(false);
    setTranscription("");
    setActionPlan({ resumo: [], tarefas: [], proximos: [] });
    setShowMindMap(false);
    setShowChecklist(false);

    const formData = new FormData();
    formData.append("audio", file);

    try {
      const response = await fetch("http://localhost:3001/transcribe", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setTranscription(data.text || "Erro ao transcrever");
      setUploadSuccess(true);
    } catch (error) {
      console.error("Erro ao transcrever:", error);
      setTranscription("Erro na transcrição");
    } finally {
      setUploading(false);
    }
  };

  const handleGenerateFullPlan = async () => {
    if (!transcription) return;
    setLoadingPlan(true);
    try {
      const response = await fetch("http://localhost:3001/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: transcription }),
      });
      const data = await response.json();
      setActionPlan({
        resumo: data.resumo || [],
        tarefas: data.tarefas || [],
        proximos: [
          "Apresentar plano à diretoria",
          "Validar pendências até sexta",
          "Iniciar ciclo de acompanhamento",
        ],
      });
    } catch (error) {
      console.error("Erro ao gerar plano de ação:", error);
      setActionPlan({ resumo: [], tarefas: [], proximos: ["Erro ao gerar plano de ação"] });
    } finally {
      setLoadingPlan(false);
    }
  };

  const exportToPDF = (elementId: string, filename: string) => {
    const element = document.getElementById(elementId);
    if (!element) return alert("Elemento não encontrado para exportar");

    html2pdf()
      .from(element)
      .set({
        margin: 0.5,
        filename: `${filename}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .save();
  };

  const renderList = (items: string[]) =>
    items.map((item, idx) => (
      <li key={idx} className="text-white/80 text-sm">• {item}</li>
    ));

  
  const exportStructuredPlanPDF = () => {
    const plano = actionPlan.tarefas.concat(actionPlan.proximos);
    if (!plano.length) {
      alert("Nenhum dado disponível para exportar.");
      return;
    }
    const container = document.createElement("div");
    const dataHoje = new Date().toLocaleDateString();
    container.innerHTML = `<h2>Plano de Ação — Reunião ${dataHoje}</h2>`;
    plano.forEach((item) => {
      container.innerHTML += `
        <div style="margin-bottom: 12px;">
          <p><strong>📌</strong> ${item}</p>
          <p><strong>👤 Responsável:</strong> ___________</p>
          <p><strong>⏳ Prazo:</strong> ___________</p>
          <p><strong>🟡 Status:</strong> Em andamento</p>
        </div>
      `;
    });
    container.innerHTML += "<hr/><h3>2. Destaques / Notas</h3><p>-</p><h3>3. Encaminhamentos Finais</h3><p>- Próxima reunião:</p><p>- Participantes:</p>";
    html2pdf().from(container).set({
      margin: 0.5,
      filename: `Ata_Estruturada_${dataHoje}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    }).save();
  };


  return (
    <div className="min-h-screen bg-cover bg-center text-white font-sans flex flex-col items-center py-10 px-4" style={{ backgroundImage: "url('/background.png')" }}>
      <div className="w-full max-w-7xl bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Aura</h1>
          <p className="text-sm text-white/80">Transcribe and act on your meetings with AI</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="planoDeAcao">
          <div>
            <p className="text-sm font-semibold text-white/90">1 Upload</p>
            <input type="file" onChange={handleFileChange} className="w-full px-3 py-2 mt-1 rounded-md bg-white/10 text-sm text-white border border-white/20" />
            {uploading && <p className="text-xs text-white/60 animate-pulse mt-2">Iniciando transcrição...</p>}
            {uploadSuccess && (
              <div className="mt-2 space-y-1">
                <p className="text-xs text-emerald-400">✅ Upload concluído!</p>
                {!loadingPlan && actionPlan.resumo.length === 0 && (
                  <button onClick={handleGenerateFullPlan} className="animate-pulse flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20 hover:text-white transition-all text-xs font-medium mt-2">
                    ⚡ Gerar plano de ação com IA
                  </button>
                )}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-white/90">2 Transcrição</p>
            <textarea value={transcription} readOnly className="w-full px-3 py-2 mt-1 rounded-md bg-white/10 text-sm text-white border border-white/20 cursor-default" rows={6} />
          </div>

          <div className="max-h-[320px] overflow-y-auto pr-2">
  <p className="text-sm font-semibold text-white/90">3 Plano de Ação</p>
  {loadingPlan && <p className="text-xs text-white/60 animate-pulse mt-1">⏳ Gerando plano...</p>}
  {actionPlan.resumo.length > 0 && (
    <>
      <p className="text-white/70 text-sm mt-2 font-medium">Resumo:</p>
      <ul>{renderList(actionPlan.resumo)}</ul>
    </>
  )}
  {actionPlan.tarefas.length > 0 && (
    <>
      <p className="text-white/70 text-sm mt-2 font-medium">Pendências:</p>
      <ul>{renderList(actionPlan.tarefas)}</ul>
    </>
  )}
  {actionPlan.proximos.length > 0 && (
    <>
      <p className="text-white/70 text-sm mt-2 font-medium">Próximos passos:</p>
      <ul>{renderList(actionPlan.proximos)}</ul>
    </>
  )}
</div>

        </div>

        <div className="mt-4 flex gap-3 justify-center">
          {/* Botão Plano */}
          <div className="relative">
            <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-100/10 hover:bg-violet-200/10 text-violet-100 text-xs font-medium">
              <Zap className="w-4 h-4" /> Plano <ChevronDown className="w-3 h-3" />
            </button>
            {showDropdown && (
              <div className="absolute bottom-full left-0 mb-2 bg-white/10 backdrop-blur-lg rounded-lg shadow-md border border-white/10 w-56 p-2 space-y-1 text-sm z-10">
                <button onClick={handleGenerateFullPlan} className="w-full text-left text-white hover:bg-white/10 px-2 py-1 rounded">Gerar Plano</button>
                <button onClick={() => setShowMindMap(true)} className="w-full text-left text-white hover:bg-white/10 px-2 py-1 rounded">Criar Mapa Mental</button>
                <button onClick={() => setShowChecklist(true)} className="w-full text-left text-white hover:bg-white/10 px-2 py-1 rounded">Checklist Prioritário</button>
              </div>
            )}
          </div>

          {/* Botão PDF */}
          <div className="relative">
            <button onClick={() => setShowPDFDropdown(!showPDFDropdown)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium">
              <FileText className="w-4 h-4" /> PDF <ChevronDown className="w-3 h-3" />
            </button>
            {showPDFDropdown && (
              <div className="absolute bottom-full left-0 mb-2 bg-white/10 backdrop-blur-lg rounded-lg shadow-md border border-white/10 w-56 p-2 space-y-1 text-sm z-10">
                <button onClick={() => exportToPDF("planoDeAcao", "Plano_de_Acao")} className="w-full text-left text-white hover:bg-white/10 px-2 py-1 rounded">Exportar Plano</button>
                <button onClick={() => exportToPDF("mapaMental", "Mapa_Mental")} className="w-full text-left text-white hover:bg-white/10 px-2 py-1 rounded">Exportar Mapa Mental</button>
                <button onClick={() => exportToPDF("checklistPrioritario", "Checklist_Prioritario")} className="w-full text-left text-white hover:bg-white/10 px-2 py-1 rounded">Exportar Checklist</button>
<button onClick={exportStructuredPlanPDF} className="w-full text-left text-white hover:bg-white/10 px-2 py-1 rounded">Exportar Ata Estruturada</button>

              </div>
            )}
          </div>

          {/* Botão Email */}
          <button onClick={() => alert("Email enviado com sucesso!")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium">
            <Mail className="w-4 h-4" /> Email
          </button>

          {/* Botão Save */}
          <button onClick={savePlanToLocalStorage} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium">
            <Clock className="w-4 h-4" /> Save
          </button>

          {/* Botão History */}
          <div className="relative">
            <button onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium">
              <History className="w-4 h-4" /> History
            </button>
            {showHistory && (
              <div className="absolute bottom-full right-0 mb-2 bg-white/10 backdrop-blur-lg rounded-lg shadow-md border border-white/10 w-80 p-2 space-y-1 text-sm z-10">
                {getPlanHistory().map((item: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActionPlan(item.plan);
                      setTranscription(item.transcription);
                      setShowHistory(false);
                    }}
                    className="w-full text-left text-white hover:bg-white/10 px-2 py-1 rounded"
                  >
                    📅 {item.timestamp}
                    <div className="text-xs opacity-70 truncate">{item.resumo}</div>
                  </button>
                ))}
                {getPlanHistory().length === 0 && (
                  <p className="text-white/50 text-xs italic px-2 py-1">Nenhum plano salvo ainda.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Blocos inferiores */}
        <div className="w-full max-w-6xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">{showMindMap && (
  <div id="mapaMental" className="bg-white/10 border border-white/20 rounded-lg p-4 text-white">
    <MindMapViewer actionPlan={{
      resumo: actionPlan.resumo || [],
      tarefas: actionPlan.tarefas || [],
      proximos: actionPlan.proximos || []
    }} />
  </div>
)}

          {showChecklist && (
            <div id="checklistPrioritario" className="bg-white/10 border border-white/20 rounded-lg p-4">
              <p className="font-semibold text-white mb-1">✔️ Checklist Prioritário</p>
              <ul className="list-disc pl-5 text-sm text-white/80">
                {actionPlan.tarefas.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
                {actionPlan.proximos.map((item, i) => (
                  <li key={`p-${i}`}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
