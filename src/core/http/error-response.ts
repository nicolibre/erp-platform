export type ErrorResponse = {
  success: false;
  message: string;
  timestamp: string;
  errors?: string[];
};