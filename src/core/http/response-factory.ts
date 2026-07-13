import { Messages } from "../constants";

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

  static ok<T>(data: T): ApiResponse<T> {
    return this.build(
      data,
      Messages.FOUND,
    );
  }

  static created<T>(data: T): ApiResponse<T> {
    return this.build(
      data,
      Messages.CREATED,
    );
  }

  static updated<T>(data: T): ApiResponse<T> {
    return this.build(
      data,
      Messages.UPDATED,
    );
  }

  static deleted<T>(data: T): ApiResponse<T> {
    return this.build(
      data,
      Messages.DELETED,
    );
  }

  static paginated<T>(
    data: T,
    meta: PaginationMeta,
  ): ApiResponse<T> {
    return this.build(
      data,
      Messages.FOUND,
      meta,
    );
  }
}