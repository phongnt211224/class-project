import {Injectable} from '@angular/core';
import {BaseService} from "@core/services/base/base.service";
import {firstValueFrom, Observable} from "rxjs";
import {HTTP_STATUS_CODE, UrlConstant} from "@core/shared/constants/common";
import {StorageService} from "@core/services/storage.service";
import {HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {


  public login(data: any): Observable<any> {
    this.resetRequest();
    this.requestOptions.data = data;
    const url = '/auth/login/';
    return this.post(url, this.requestOptions);
  }

  public clearData() {
    localStorage.clear();
  }

  public saveStorage(res: any) {
    if (res && res.code == 'SUCCESS') {
      const userLogin: any = {};
      userLogin.role = res.role;
      userLogin.access = res.data.accessToken;
      this.cookieService.set('accessToken', res.data.accessToken);
      this.cookieService.set('refreshToken', res.data.refreshToken);
      StorageService.set('USER_LOGIN', userLogin);
    }
  }

  public getAccessToken(data) {
    this.resetRequest();
    this.requestOptions.params = data;
    const url = '/auth/getAccesstoken/';
    return this.get(url, this.requestOptions);
  }

  public getUserInfo(data) {
    this.resetRequest();
    this.requestOptions.header = new HttpHeaders({accessToken: data.access});
    const url = '/auth/getUser/';
    return this.get(url, this.requestOptions);
  }

  async isAuthenticated(): Promise<boolean> {
    const accessToken = this.cookieService.get('accessToken');
    if (!accessToken) return false;

    try {
      const res = await firstValueFrom(this.getUserInfo(accessToken));
      return res && res.code === HTTP_STATUS_CODE.SUCCESS;
    } catch {
      return false;
    }
  }
}
