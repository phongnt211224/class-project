import {Injectable, Injector} from "@angular/core";
import {BaseService} from "@core/services/base/base.service";
import {Observable} from "rxjs";
import {NzModalService} from "ng-zorro-antd/modal";

@Injectable({
  providedIn: 'root',
})


export class ResearchFieldService extends BaseService{


  public getListData(params?: any): Observable<any> {
    this.resetRequest();
    this.requestOptions.params = params;
    const url = '/researchfield/get';
    return this.get(url, this.requestOptions);
  }

  public getProject(id):Observable<any>{
    this.resetRequest();
    const url = `/project/get/${id}`;
    return this.get(url, this.requestOptions);
  }

  public postCreate(data):Observable<any>{
    this.resetRequest()
    const url = `/researchfield/create`;
    this.requestOptions.data = data
    return this.post(url,this.requestOptions)
  }

  public putUpdate(data,id):Observable<any>{
    this.resetRequest()
    const url = `/researchfield/update/${id}`;
    this.requestOptions.data = data
    return this.put(url,this.requestOptions)
  }

  public getDataById(id):Observable<any>{
    this.resetRequest();
    const url = `/researchfield/get/${id}`;
    return this.get(url, this.requestOptions);
  }


  public deleteById(id):Observable<any>{
    this.resetRequest()
    const url = `/researchfield/delete/${id}`;
    return this.delete(url,this.requestOptions)
  }


}
