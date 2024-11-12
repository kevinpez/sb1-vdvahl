import React, { useState } from 'react';
import { useStreamStore } from '../store/streamStore';

export const AddStreamForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const addStream = useStreamStore((state) => state.addStream);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && name) {
      addStream(url, name);
      setUrl('');
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-dark-800 rounded-lg shadow-lg p-6 mb-6 border border-dark-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-100">Add New Stream</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Stream Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-dark-900 border border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            placeholder="Main Camera"
            required
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-1">
            RTSP URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 bg-dark-900 border border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            placeholder="rtsp://example.com/stream"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Stream
      </button>
    </form>
  );
};