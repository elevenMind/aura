import React from "react";

type ActionPlan = {
  resumo: string[];
  tarefas: string[];
  proximos: string[];
};

interface MindMapViewerProps {
  actionPlan: ActionPlan;
}

export default function MindMapViewer({ actionPlan }: { actionPlan: any }) {
  if (!actionPlan || !actionPlan.resumo) return null;

  const width = 800;
  const height = 600;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 200;

  const categories = [
    { title: "Resumo", items: actionPlan.resumo, angle: 0 },
    { title: "Pendências", items: actionPlan.tarefas, angle: 120 },
    { title: "Próximos passos", items: actionPlan.proximos, angle: 240 },
  ];

  return (
    <div className="flex justify-center items-center py-6 overflow-x-auto">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradiente central */}
        <defs>
          <radialGradient id="centerGradient">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#6b21a8" />
          </radialGradient>
        </defs>

        {/* Centro */}
        <circle cx={centerX} cy={centerY} r={50} fill="url(#centerGradient)" />
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="14"
          fontWeight="bold"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
        >
          Plano de Ação
        </text>

        {/* Ramos */}
        {categories.map((cat, i) => {
          const angleRad = (cat.angle * Math.PI) / 180;
          const endX = centerX + radius * Math.cos(angleRad);
          const endY = centerY + radius * Math.sin(angleRad);

          return (
            <g key={i}>
              {/* Linha principal */}
              <line
                x1={centerX}
                y1={centerY}
                x2={endX}
                y2={endY}
                stroke="#a78bfa"
                strokeWidth={2}
              />

              {/* Título da categoria */}
              <text
                x={endX}
                y={endY - 10}
                textAnchor="middle"
                fontSize="12"
                fill="#9333ea"
                fontWeight="bold"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
              >
                {cat.title}
              </text>

              {/* Itens */}
              {cat.items.map((item, j) => (
                <text
                  key={j}
                  x={endX}
                  y={endY + 20 + j * 20}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#ede9fe"
                  style={{ textShadow: "0 1px 1px rgba(0,0,0,0.4)" }}
                >
                  • {item}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
