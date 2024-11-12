import { create } from 'zustand';
import { Stream, StreamMetrics } from '../types/stream';

interface StreamStore {
  streams: Stream[];
  addStream: (url: string, name: string) => void;
  removeStream: (id: string) => void;
  updateStreamMetrics: (id: string, metrics: Partial<StreamMetrics>) => void;
  updateStreamStatus: (id: string, status: Stream['status'], error?: string) => void;
}

const generateRandomMetrics = (): StreamMetrics => ({
  bitrate: Math.floor(Math.random() * 5000) + 2000,
  fps: Math.floor(Math.random() * 30) + 25,
  resolution: '1920x1080',
  latency: Math.floor(Math.random() * 200) + 50,
  packetLoss: Number((Math.random() * 2).toFixed(2)),
});

export const useStreamStore = create<StreamStore>((set) => ({
  streams: [],
  addStream: (url, name) => {
    set((state) => ({
      streams: [
        ...state.streams,
        {
          id: crypto.randomUUID(),
          name,
          url,
          status: 'connected',
          lastUpdate: new Date(),
          metrics: generateRandomMetrics(),
        },
      ],
    }));
  },
  removeStream: (id) => {
    set((state) => ({
      streams: state.streams.filter((stream) => stream.id !== id),
    }));
  },
  updateStreamMetrics: (id, metrics) => {
    set((state) => ({
      streams: state.streams.map((stream) =>
        stream.id === id
          ? {
              ...stream,
              metrics: { ...stream.metrics, ...metrics },
              lastUpdate: new Date(),
            }
          : stream
      ),
    }));
  },
  updateStreamStatus: (id, status, error) => {
    set((state) => ({
      streams: state.streams.map((stream) =>
        stream.id === id
          ? {
              ...stream,
              status,
              error,
              lastUpdate: new Date(),
            }
          : stream
      ),
    }));
  },
}));