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


}
