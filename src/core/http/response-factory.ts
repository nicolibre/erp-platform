import { ApiResponse } from "./api-response";
import { PaginationMeta } from "./pagination-meta";

export class ResponseFactory {

  private static response<T>(
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

  static ok<T>(data: T) {
    return this.response(
      data,
      "Operación realizada correctamente.",
    );
  }

  static created<T>(data: T) {
    return this.response(
      data,
      "Registro creado correctamente.",
    );
  }

  static updated<T>(data: T) {
    return this.response(
      data,
      "Registro actualizado correctamente.",
    );
  }

  static deleted<T>(data: T) {
    return this.response(
      data,
      "Registro eliminado correctamente.",
    );
  }

  static paginated<T>(
    data: T,
    meta: PaginationMeta,
  ) {
    return this.response(
      data,
      "Operación realizada correctamente.",
      meta,
    );
  }

}