import {Injectable} from '@angular/core';
import {BaseService} from "@core/services/base/base.service";
import {Observable} from "rxjs";
import {HTTP_STATUS_CODE, UrlConstant} from "@core/shared/constants/common";
import {StorageService} from "@core/services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  public login(data: any): Observable<any> {
    this.resetRequest();
    this.requestOptions.data = data;
    const url = '/auth/login';
    return this.post(url, this.requestOptions);
  }

  public clearData() {
    localStorage.clear();
  }

  public saveStorage(res: any) {
    if (res && res.code == 'SUCCESS') {
      const userLogin: any = {};
      userLogin.role = res.role;
      userLogin.refresh = res.data.access;
      StorageService.set('USER_LOGIN', userLogin);
    }
  }

  public getAccessToken(data) {
    this.resetRequest();
    this.requestOptions.data = data;
    const url = '/auth/getAccesstoken';
    return this.get(url, this.requestOptions);
  }

  public isAuthenticated() {
    let accessToken = null;
    this.getAccessToken(StorageService.get('USER_LOGIN')).subscribe(res => {
      if (res && res.code === HTTP_STATUS_CODE.SUCCESS) {
        accessToken = res.access;
      }
    });
    if (accessToken && StorageService.get('USER_LOGIN')) {
      return accessToken;
    }
  }
}
