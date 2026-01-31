import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modified = req.clone({
      setParams: {
        apikey: 'c9aaa35e'
      }
    });
    return next.handle(modified);
  }
}
