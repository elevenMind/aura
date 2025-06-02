import React, { useState } from 'react';
import ResultPreview from './ResultPreview';

const UploadForm: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('http://localhost:3001/upload', { method: 'POST' });
    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleUpload} className="flex justify-center mb-6">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-200"
        >
          {loading ? "Processando..." : "Simular Upload de Reunião"}
        </button>
      </form>
      {result && <ResultPreview data={result} />}
    </div>
  );
};

export default UploadForm;
