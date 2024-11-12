import React, { useEffect } from 'react';
import { Camera } from 'lucide-react';
import { AddStreamForm } from './components/AddStreamForm';
import { StreamCard } from './components/StreamCard';
import { useStreamStore } from './store/streamStore';

const App: React.FC = () => {
  const { streams, updateStreamMetrics, updateStreamStatus } = useStreamStore();

  useEffect(() => {
    const interval = setInterval(() => {
      streams.forEach((stream) => {
        updateStreamMetrics(stream.id, {
          bitrate: Math.floor(Math.random() * 5000) + 2000,
          fps: Math.floor(Math.random() * 30) + 25,
          latency: Math.floor(Math.random() * 200) + 50,
          packetLoss: Number((Math.random() * 2).toFixed(2)),
        });

        if (Math.random() < 0.1) {
          const statuses: Array<'connected' | 'disconnected' | 'error'> = [
            'connected',
            'disconnected',
            'error',
          ];
          const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
          updateStreamStatus(
            stream.id,
            newStatus,
            newStatus === 'error' ? 'Connection timeout' : undefined
          );
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [streams, updateStreamMetrics, updateStreamStatus]);

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Camera size={32} className="text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-100">RTSP Stream Monitor</h1>
        </div>

        <AddStreamForm />

        {streams.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No streams added yet. Add a stream to begin monitoring.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {streams.map((stream) => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;