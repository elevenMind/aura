import express from 'express';
import multer from 'multer';
import axios from 'axios';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config(); // <--- ESSENCIAL

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const ASSEMBLY_API_KEY = process.env.ASSEMBLY_API_KEY || 'SUA_CHAVE_AQUI';


router.post('/', upload.single('audio'), async (req, res) => {
  try {
    const filePath = req.file?.path;
    if (!filePath) return res.status(400).json({ error: 'Nenhum arquivo enviado.' });

    const uploadRes = await axios.post(
      'https://api.assemblyai.com/v2/upload',
      fs.createReadStream(filePath),
      {
        headers: {
          authorization: ASSEMBLY_API_KEY,
          'transfer-encoding': 'chunked',
        },
      }
    );

    const uploadUrl = uploadRes.data.upload_url;

    const transcriptRes = await axios.post(
  'https://api.assemblyai.com/v2/transcript',
  {
    audio_url: uploadUrl,
    language_code: 'pt', // <- forçamos português
  },
  {
    headers: { authorization: ASSEMBLY_API_KEY },
  }
);


    const transcriptId = transcriptRes.data.id;

    let transcript;
    while (true) {
      const pollingRes = await axios.get(
        `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
        {
          headers: { authorization: ASSEMBLY_API_KEY },
        }
      );
      if (pollingRes.data.status === 'completed') {
        transcript = pollingRes.data.text;
        break;
      } else if (pollingRes.data.status === 'error') {
        throw new Error('Erro na transcrição');
      }
      await new Promise((r) => setTimeout(r, 3000));
    }

    res.json({ text: transcript });
    fs.unlinkSync(filePath);

  } catch (err) {
    console.error('Erro no backend:', err);
    res.status(500).json({ error: 'Erro na transcrição' });
  }
});

export default router;