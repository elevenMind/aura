import express from 'express';
import cors from 'cors';
import transcribeRoute from './routes/transcribe';
import analyzeRoute from './routes/analyze';
import sendEmailRoute from './routes/sendEmail';
import saveRoute from './routes/save';
import historyRoute from './routes/history';
import exportRoute from './routes/export';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/export', exportRoute);

app.use('/transcribe', transcribeRoute);
app.use('/analyze', analyzeRoute); // ✅ Adicionado
app.use('/send-email', sendEmailRoute); // ✅ Adicionado
app.use('/save', saveRoute); // ✅ Adicionado
app.use('/history', historyRoute); // ✅ Adicionado

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
