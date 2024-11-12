export interface StreamMetrics {
  bitrate: number;
  fps: number;
  resolution: string;
  latency: number;
  packetLoss: number;
}

export interface Stream {
  id: string;
  name: string;
  url: string;
  status: 'connected' | 'disconnected' | 'error';
  lastUpdate: Date;
  metrics: StreamMetrics;
  error?: string;
}