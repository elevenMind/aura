import { Router } from 'express';
const router = Router();

router.post('/', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Missing text' });

const result = {
  resumo: [
    "Debate sobre como ferramentas como o WhatsApp e bots podem aumentar a produtividade sem substituir vendedores.",
    "Exposição de cases práticos de atendimento automatizado no setor imobiliário, incluindo um marketplace de aluguel de carros.",
    "Evolução do pitch do ChatGuru: de 'reduzir equipe' para 'ampliar resultados com a mesma equipe'.",
    "Identificação de problemas com leads desqualificados e criação de soluções automatizadas para validação e qualificação.",
    "Relato sobre experiências de vendas anteriores com CRM próprio, cobrança por lead e uso de mídia paga com risco próprio."
  ],
  tarefas: [
    "Mapear os três principais casos de uso citados durante a residência.",
    "Documentar o case do ChatGuru com validação de leads via WhatsApp.",
    "Agendar reunião com o cliente do setor imobiliário para entender o impacto pós-implementação.",
    "Validar funcionalidades atuais do ChatGuru em relação às necessidades de SDRs e corretores.",
    "Avaliar como estruturar um novo pitch de vendas com foco em eficiência, não em redução de equipe."
  ],
  plano: [
    {
      area: "Marketing/Vendas",
      descricao: "Criar um pitch atualizado com foco em aumento de produtividade e receita (não downsizing).",
      responsavel: "Equipe de marketing",
      prazo: "2025-06-15",
      status: "Pendente"
    },
    {
      area: "Produto",
      descricao: "Produzir vídeo demonstrativo moderno (como o pitch de 8 minutos citado).",
      responsavel: "Lucas",
      prazo: "2025-06-20",
      status: "Em andamento"
    },
    {
      area: "Comercial",
      descricao: "Realizar treinamento interno com SDRs para integração mais fluida com a IA.",
      responsavel: "Equipe de SDR",
      prazo: "2025-06-18",
      status: "Pendente"
    },
    {
      area: "Expansão",
      descricao: "Explorar replicação do case para outros mercados (como locação de veículos).",
      responsavel: "Time de estratégia",
      prazo: "2025-06-25",
      status: "Planejado"
    },
    {
      area: "Financeiro",
      descricao: "Revalidar a estratégia de cobrança por lead vs fee fixo com novos clientes.",
      responsavel: "Financeiro",
      prazo: "2025-06-28",
      status: "Não iniciado"
    }
  ]
};


  res.json(result);
});

export default router;
	  	