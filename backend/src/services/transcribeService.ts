import axios from 'axios';
import fs from 'fs';

const assemblyApiKey = process.env.ASSEMBLYAI_API_KEY!;
const uploadUrl = 'https://api.assemblyai.com/v2/upload';
const transcriptUrl = 'https://api.assemblyai.com/v2/transcript';

export async function transcribeAudio(filePath: string): Promise<string> {
  const audioData = fs.readFileSync(filePath);
  const uploadRes = await axios.post(uploadUrl, audioData, {
    headers: {
      authorization: assemblyApiKey,
      'content-type': 'application/octet-stream'
    }
  });

  const transcriptRes = await axios.post(transcriptUrl, {
    audio_url: uploadRes.data.upload_url
  }, {
    headers: { authorization: assemblyApiKey }
  });

  const transcriptId = transcriptRes.data.id;

  while (true) {
    const pollingRes = await axios.get(`${transcriptUrl}/${transcriptId}`, {
      headers: { authorization: assemblyApiKey }
    });

    if (pollingRes.data.status === 'completed') {
      return pollingRes.data.text;
    } else if (pollingRes.data.status === 'error') {
      throw new Error(pollingRes.data.error);
    }

    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}
