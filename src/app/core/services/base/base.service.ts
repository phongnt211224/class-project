import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

export interface RequestOptions {
  data?: any;
  params?: { [param: string]: string | string[] | boolean | number } | HttpParams;
  observe?: 'response' | 'body';
  responseType?: 'json' | 'blob';
}

@Injectable()
export class BaseService {
  protected httpClient: HttpClient;
  private baseUrl = environment.backendUrl;

  constructor(protected readonly injector: Injector) {
    this.httpClient = this.injector.get(HttpClient);
  }

  protected get(endpointUrl: string, options?: RequestOptions): Observable<any> {
    const requestOptions = this.createRequestOptions(options);
    const url = this.baseUrl + endpointUrl;
    return this.httpClient.get(url, requestOptions).pipe(
      catchError(this.handleError)
    );
  }

  protected post(endpointUrl: string, options?: RequestOptions): Observable<any> {
    const requestOptions = this.createRequestOptions(options);
    const url = this.baseUrl + endpointUrl;
    return this.httpClient.post(url, options?.data || null, requestOptions).pipe(
      catchError(this.handleError)
    );
  }

  protected put(endpointUrl: string, options?: RequestOptions): Observable<any> {
    const requestOptions = this.createRequestOptions(options);
    const url = this.baseUrl + endpointUrl;
    return this.httpClient.put(url, options?.data || null, requestOptions).pipe(
      catchError(this.handleError)
    );
  }

  protected delete(endpointUrl: string, options?: RequestOptions): Observable<any> {
    const requestOptions = this.createRequestOptions(options);
    const url = this.baseUrl + endpointUrl;
    return this.httpClient.delete(url, requestOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    return throwError(() => error.error || error);
  }

  private createRequestOptions(options?: RequestOptions): {
    headers?: HttpHeaders;
    params?: HttpParams;
    observe: any;
    responseType: any;
  } {
    const requestOptions: any = {
      observe: options?.observe || 'body',
      responseType: options?.responseType || 'json'
    };

    if (options?.params) {
      requestOptions.params = options.params instanceof HttpParams
        ? options.params
        : this.toParams(options.params);
    }

    return requestOptions;
  }

  private toParams(params: any): HttpParams {
    let httpParams = new HttpParams();

    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key] != null) {
        const value = params[key];
        if (Array.isArray(value)) {
          value.forEach(item => {
            httpParams = httpParams.append(key, item);
          });
        } else {
          httpParams = httpParams.set(key, value.toString());
        }
      }
    }

    return httpParams;
  }
}
