import React from 'react';
import { Activity, Signal, Wifi, X } from 'lucide-react';
import { Stream } from '../types/stream';
import { useStreamStore } from '../store/streamStore';

interface StreamCardProps {
  stream: Stream;
}

export const StreamCard: React.FC<StreamCardProps> = ({ stream }) => {
  const removeStream = useStreamStore((state) => state.removeStream);

  const getStatusColor = (status: Stream['status']) => {
    switch (status) {
      case 'connected':
        return 'bg-green-500';
      case 'disconnected':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
    }
  };

  const getThumbnailUrl = (id: string) => {
    const seeds = [
      'security-camera',
      'cctv',
      'surveillance',
      'monitoring',
      'camera-feed'
    ];
    const seed = seeds[parseInt(id.slice(0, 8), 16) % seeds.length];
    return `https://source.unsplash.com/800x600/?${seed}`;
  };

  return (
    <div className="bg-dark-800 rounded-lg shadow-lg overflow-hidden border border-dark-700">
      <div className="relative">
        <div className="aspect-video bg-dark-950 overflow-hidden">
          <img
            src={getThumbnailUrl(stream.id)}
            alt={`${stream.name} preview`}
            className="w-full h-full object-cover opacity-90"
          />
        </div>
        <div className="absolute top-2 right-2 left-2 flex items-center justify-between">
          <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(stream.status)}`} />
            <span className="text-white text-sm font-medium">
              {stream.status.charAt(0).toUpperCase() + stream.status.slice(1)}
            </span>
          </div>
          <button
            onClick={() => removeStream(stream.id)}
            className="bg-black/70 backdrop-blur-sm rounded-full p-1.5 text-white hover:bg-black/90 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-100">{stream.name}</h3>
        <p className="text-sm text-gray-400 mb-4 truncate">{stream.url}</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-blue-400" />
            <span className="text-sm text-gray-300">{stream.metrics.bitrate} kbps</span>
          </div>
          <div className="flex items-center gap-2">
            <Signal size={16} className="text-green-400" />
            <span className="text-sm text-gray-300">{stream.metrics.fps} FPS</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi size={16} className="text-purple-400" />
            <span className="text-sm text-gray-300">{stream.metrics.latency}ms</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-400 text-sm">Loss:</span>
            <span className="text-sm text-gray-300">{stream.metrics.packetLoss}%</span>
          </div>
        </div>

        {stream.error && (
          <div className="mt-4 p-2 bg-red-900/50 text-red-300 text-sm rounded border border-red-800">
            {stream.error}
          </div>
        )}

        <div className="mt-4 text-xs text-gray-500">
          Last updated: {stream.lastUpdate.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};