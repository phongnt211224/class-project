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

  public postCreate(data):Observable<any>{
    this.resetRequest()
    const url = `/account/create`;
    this.requestOptions.data = data
    return this.post(url,this.requestOptions)
  }

  public putUpdate(data,id):Observable<any>{
    this.resetRequest()
    const url = `/account/update/${id}`;
    this.requestOptions.data = data
    return this.put(url,this.requestOptions)
  }

  public getDataById(id):Observable<any>{
    this.resetRequest();
    const url = `/account/get/${id}`;
    return this.get(url, this.requestOptions);
  }


  public deleteById(id):Observable<any>{
    this.resetRequest()
    const url = `/account/delete/${id}`;
    return this.delete(url,this.requestOptions)
  }

}
