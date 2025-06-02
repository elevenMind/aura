import React from 'react';
import UploadForm from './components/UploadForm';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Talks Pinhopó</h1>
        <UploadForm />
      </div>
    </div>
  );
}

export default App;
