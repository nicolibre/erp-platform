import { ApiResponse } from "./api-response";
import { PaginationMeta } from "./pagination-meta";

export class ResponseFactory {
  private static build<T>(
    data: T,
    message: string,
    meta?: PaginationMeta,
  ): ApiResponse<T> {
    return {
      success: true,
      message,
      timestamp: new Date().toISOString(),
      data,
      meta,
    };
  }

  static ok<T>(
    data: T,
    message = "Operación realizada correctamente.",
  ): ApiResponse<T> {
    return this.build(data, message);
  }

  static created<T>(
    data: T,
    message = "Registro creado correctamente.",
  ): ApiResponse<T> {
    return this.build(data, message);
  }

  static updated<T>(
    data: T,
    message = "Registro actualizado correctamente.",
  ): ApiResponse<T> {
    return this.build(data, message);
  }

  static deleted<T>(
    data: T,
    message = "Registro eliminado correctamente.",
  ): ApiResponse<T> {
    return this.build(data, message);
  }

  static paginated<T>(
    data: T,
    meta: PaginationMeta,
    message = "Operación realizada correctamente.",
  ): ApiResponse<T> {
    return this.build(data, message, meta);
  }
}