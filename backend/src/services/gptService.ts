export async function analyzeWithGPT(transcript: string) {
  // MOCK para testes antes da API real
  return {
    resumo: [
      "Resumo do progresso das tarefas em andamento",
      "Discussão sobre próximos passos estratégicos",
      "Alinhamento de expectativas com stakeholders"
    ],
    tarefas: [
      "Finalizar layout do dashboard — Ana (quarta-feira)",
      "Apresentar proposta ao comercial — Bruno",
      "Validar integração com API externa — Equipe técnica"
    ]
  };
}
