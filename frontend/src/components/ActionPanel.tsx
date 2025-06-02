import React from 'react';
import { ClipboardList, Send, FileText, Mail, Clock, Sparkles } from 'lucide-react';

const actions = [
  { icon: <ClipboardList className="w-4 h-4" />, label: "Criar Plano de Ação" },
  { icon: <Send className="w-4 h-4" />, label: "Enviar para Planner" },
  { icon: <FileText className="w-4 h-4" />, label: "Exportar PDF" },
  { icon: <Mail className="w-4 h-4" />, label: "Enviar por E-mail" },
  { icon: <Clock className="w-4 h-4" />, label: "Salvar Histórico" },
  { icon: <Sparkles className="w-4 h-4" />, label: "Revisar com IA" },
];

const ActionPanel: React.FC = () => {
  return (
    <div className="bg-[#181a1c] border border-white/10 p-6 rounded-xl shadow-md w-full max-w-xs space-y-4">
      <h3 className="text-sm font-semibold text-white/60 tracking-wide">Ações</h3>
      <ul className="space-y-3">
        {actions.map((action, idx) => (
          <li key={idx} className="flex items-center gap-3 text-white/90 hover:text-white cursor-pointer transition">
            <div className="p-2 bg-white/5 rounded-md">
              {action.icon}
            </div>
            <span className="text-sm">{action.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionPanel;
