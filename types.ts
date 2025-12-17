export interface ConfettiOptions {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  origin?: {
    x?: number;
    y?: number;
  };
  colors?: string[];
  shapes?: string[];
  scalar?: number;
  zIndex?: number;
  disableForReducedMotion?: boolean;
}

declare global {
  interface Window {
    confetti: (options?: ConfettiOptions) => Promise<null> | null;
  }
}

export interface FeedbackData {
  startupName: string;
  rating: number;
  feedback: string;
}

export interface Submission extends FeedbackData {
  timestamp: string;
}

export interface AggregatedResult {
  startupName: string;
  totalRating: number;
  count: number;
  average: number;
}