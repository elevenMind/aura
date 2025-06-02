import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.post('/', (req, res) => {
  const { transcript, resumo, tarefas } = req.body;
  const record = {
    id: Date.now(),
    date: new Date().toISOString(),
    transcript,
    resumo,
    tarefas
  };

  const filePath = path.join(__dirname, '../../data/history.json');
  let history = [];

  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    history = JSON.parse(fileData);
  }

  history.push(record);
  fs.writeFileSync(filePath, JSON.stringify(history, null, 2));
  res.json({ success: true });
});

export default router;
