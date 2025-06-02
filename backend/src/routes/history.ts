import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../../data/history.json');
  if (!fs.existsSync(filePath)) return res.json([]);
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const history = JSON.parse(fileData);
  res.json(history);
});

export default router;
