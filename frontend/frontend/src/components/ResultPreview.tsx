import React from 'react';

const ResultPreview: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">{data.title}</h2>

      <div>
        <h3 className="text-lg font-semibold text-gray-700">Resumo</h3>
        <ul className="list-disc list-inside text-gray-600">
          {data.summary.map((item: string, idx: number) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700">Plano de Ação</h3>
        <ul className="list-disc list-inside text-gray-600">
          {data.actions.map((action: any, idx: number) => (
            <li key={idx}>{action.task} — <strong>{action.responsible}</strong></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultPreview;
