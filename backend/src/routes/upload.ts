import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post('/', upload.single('audio'), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  const transcript = 'Transcrição simulada da reunião com conteúdo demonstrativo.';
  fs.unlinkSync(file.path);
  res.json({ transcript });
});

export default router;
