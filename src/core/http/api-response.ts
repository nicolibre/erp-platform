export type ApiResponse<T> = {
  success: boolean;
  message: string;
  timestamp: string;
  data: T;
  meta?: Record<string, unknown>;
};