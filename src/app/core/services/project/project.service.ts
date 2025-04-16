import {Injectable} from "@angular/core";
import {BaseService} from "@core/services/base/base.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})


export class ProjectService extends BaseService{

  public getListData(params?: any): Observable<any> {
    this.resetRequest();
    this.requestOptions.params = params;
    const url = '/project/get/';
    return this.get(url, this.requestOptions);
  }

  public getProject(id):Observable<any>{
    this.resetRequest();
    const url = `/project/get/${id}`;
    return this.get(url, this.requestOptions);
  }

  public postCreateProject(data):Observable<any>{
    this.resetRequest()
    const url = `/project/create/`;
    this.requestOptions.data = data
    return this.post(url,this.requestOptions)
  }

}
