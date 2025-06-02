import React, { useState } from 'react';
import ResultPreview from './ResultPreview';

const UploadForm: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState<string>("");
  const [result, setResult] = useState<{ resumo: string[]; tarefas: string[] } | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [email, setEmail] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) return;
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    const fileInput = document.getElementById("file") as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      formData.append("audio", fileInput.files[0]);

      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setTranscript(data.transcript || "(Nenhum texto detectado)");
    }

    setLoading(false);
  };

  const handleAnalyze = async () => {
    if (!transcript) return;
    setAnalyzing(true);
    const response = await fetch("http://localhost:3001/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript }),
    });

    const data = await response.json();
    setResult(data);
    setAnalyzing(false);
  };

  const handleSendEmail = async () => {
    await fetch("http://localhost:3001/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        subject: "Ata da Reunião – Visage",
        text: transcript
      })
    });
    alert("Email enviado com sucesso!");
  };

  const handleSave = async () => {
    await fetch("http://localhost:3001/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript, ...result })
    });
    alert("Reunião salva com sucesso!");
  };

  return (
    <div>
      <form onSubmit={handleUpload} className="flex flex-col items-center gap-4 mb-6">
        <label className="flex items-center gap-3 bg-white/10 text-white/80 px-4 py-2 rounded-md cursor-pointer hover:bg-white/20 transition">
          <span>{fileName || "Escolher áudio da reunião"}</span>
          <input
            type="file"
            name="audio"
            accept="audio/*"
            id="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setFileName(file ? file.name : null);
            }}
          />
        </label>
        <button
          type="submit"
          className="px-6 py-2 bg-white/10 text-white border border-white/20 rounded-md hover:bg-white/20 transition duration-200 disabled:opacity-50"
          disabled={!fileName || loading}
        >
          {loading ? "Processando..." : "Transformar Reunião"}
        </button>
      </form>

      {transcript && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-white/60 mb-1">Transcrição</h3>
          <p className="text-white/80 whitespace-pre-line">{transcript}</p>

          <button
            onClick={handleAnalyze}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            disabled={analyzing}
          >
            {analyzing ? "Analisando..." : "Analisar com IA"}
          </button>

          <div className="mt-4">
            <input
              type="email"
              placeholder="Enviar para..."
              className="px-4 py-2 rounded-md bg-white/10 text-white w-full max-w-xs mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      )}

      {result && (
        <ResultPreview
          data={result}
          transcript={transcript}
          onSave={handleSave}
          onSend={handleSendEmail}
        />
      )}
    </div>
  );
};

export default UploadForm;
