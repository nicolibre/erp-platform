import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ResponseFactory } from "./response-factory";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {

    const request = context.switchToHttp().getRequest();

    const method = request.method;

    return next.handle().pipe(
      map((data) => {

        switch (method) {

          case "POST":
            return ResponseFactory.created(data);

          case "PATCH":
          case "PUT":
            return ResponseFactory.updated(data);

          case "DELETE":
            return ResponseFactory.deleted(data);

          default:
            return ResponseFactory.ok(data);

        }

      }),
    );
  }
}