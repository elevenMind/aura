import React from 'react';
import jsPDF from 'jspdf';

interface Props {
  data: { resumo: string[]; tarefas: string[] };
  transcript: string;
  onSave: () => void;
  onSend: () => void;
}

const ResultPreview: React.FC<Props> = ({ data, transcript, onSave, onSend }) => {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();

    doc.setFontSize(16);
    doc.text(`Ata da Reunião – ${dateStr}`, 10, 20);
    doc.setFontSize(12);
    doc.text(`Gerado via Visage – ${timeStr}`, 10, 28);

    doc.setFontSize(14);
    doc.text("Resumo da Reunião:", 10, 40);
    doc.setFontSize(12);
    data.resumo.forEach((item, index) => {
      doc.text(`- ${item}`, 12, 48 + index * 8);
    });

    let offset = 48 + data.resumo.length * 8 + 10;
    doc.setFontSize(14);
    doc.text("Plano de Ação:", 10, offset);
    offset += 8;
    doc.setFontSize(12);
    data.tarefas.forEach((item, index) => {
      doc.text(`- ${item}`, 12, offset + index * 8);
    });

    doc.save(`ata-visage-${dateStr}.pdf`);
  };

  return (
    <div className="mt-6 space-y-6 p-4 bg-[#1a1c1e] rounded-lg border border-white/10">
      <div>
        <h3 className="text-white/70 font-semibold mb-2">Resumo da Reunião</h3>
        <ul className="list-disc list-inside text-white/90 space-y-1">
          {data.resumo.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-white/70 font-semibold mb-2">Plano de Ação</h3>
        <ul className="list-disc list-inside text-white/90 space-y-1">
          {data.tarefas.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="flex gap-4 pt-4">
        <button onClick={handleExportPDF} className="px-4 py-2 bg-white/10 border border-white/20 rounded text-white text-sm hover:bg-white/20 transition">Exportar PDF</button>
        <button onClick={onSave} className="px-4 py-2 bg-white/10 border border-white/20 rounded text-white text-sm hover:bg-white/20 transition">Salvar</button>
        <button onClick={onSend} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition">Enviar Ata</button>
      </div>
    </div>
  );
};

export default ResultPreview;
