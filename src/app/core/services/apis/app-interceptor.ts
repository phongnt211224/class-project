import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from "@core/shared/services/auth.service";
import {ToastrService} from "ngx-toastr";
import {CookieService} from "ngx-cookie-service";


@Injectable()
export class AppInterceptor implements HttpInterceptor {
  apiLastTime: number;
  TOKEN_HEADER_KEY = 'Authorization';

  constructor(private router: Router,
              private auth: AuthService,
              private cookieService: CookieService,
              private toastService: ToastrService
  ) {
    // if (this.auth.isAuthenticated()) {
    //   this.auth.refreshToken();
    // }
    const timeoutSession = 15 * 60 * 1000;
    setInterval(() => {
      const now = new Date().valueOf();
      if (this.apiLastTime && now - this.apiLastTime > timeoutSession) {
        // this.auth.logout();
      }
    }, 10000);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.cookieService.get('accessToken');
    if (accessToken && !req.url.toLowerCase().includes('login') && !req.url.toLowerCase().includes('refresh-token')) {
      req = this.addTokenHeader(req, accessToken);
    }
    return next.handle(req).pipe(
      tap(res => {
        if (res instanceof HttpResponse) {
          if (res.body?.code && res.body?.code !== 'SUCCESS' && res.body?.message) {
            this.toastService.error(res.body?.message);
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let messageError = 'Đã có lỗi xảy ra. Vui lòng thử lai sau!';
        if (error.status === 403) {
          this.router.navigateByUrl('/unauthorized').then();
        } else if (error.status === 400) {
          messageError = error.error?.message ? error.error?.message : messageError;
          this.toastService.error(messageError);
        } else if (error.status === 500) {
          this.toastService.error(messageError);
        }
        if (req.responseType !== 'blob') {
          return throwError(error);
        }
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, accessToken: string) {
    /* for Spring Boot back-end */
    return request.clone({headers: request.headers.set(this.TOKEN_HEADER_KEY, 'Bearer ' + accessToken)});
  }

  private clearTokenHeader(request: HttpRequest<any>) {
    /* for Spring Boot back-end */
    return request.clone({headers: request.headers.delete(this.TOKEN_HEADER_KEY)});
  }
}
