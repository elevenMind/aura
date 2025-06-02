import express from 'express';
import PDFDocument from 'pdfkit';
import { Request, Response } from 'express';

const router = express.Router();

router.post('/pdf', (req: Request, res: Response) => {
  const { text } = req.body;

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=transcription.pdf');

  doc.pipe(res);
  doc.fontSize(12).text(text || 'Nenhuma transcrição encontrada.');
  doc.end();
});

export default router;
