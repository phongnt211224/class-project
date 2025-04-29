import {Injectable} from '@angular/core';
import {BaseService} from "@core/services/base/base.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService {
  public getListData(params?: any): Observable<any> {
    this.resetRequest();
    this.requestOptions.params = params;
    const url = '/account/get';
    return this.get(url, this.requestOptions);
  }
}
