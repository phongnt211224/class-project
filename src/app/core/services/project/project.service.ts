import {Injectable, Injector} from "@angular/core";
import {BaseService} from "@core/services/base/base.service";
import {Observable} from "rxjs";
import {NzModalService} from "ng-zorro-antd/modal";

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
    const url = `/project/get/${id}/`;
    return this.get(url, this.requestOptions);
  }

  public postCreateProject(data):Observable<any>{
    this.resetRequest()
    const url = `/project/create/`;
    this.requestOptions.data = data
    return this.post(url,this.requestOptions)
  }

  public putUpdateProject(data,id):Observable<any>{
    this.resetRequest()
    const url = `/project/update/${id}/`;
    this.requestOptions.data = data
    return this.put(url,this.requestOptions)
  }

  public deleteProject(id):Observable<any>{
    this.resetRequest()
    const url = `/project/delete/${id}/`;
    return this.delete(url,this.requestOptions)
  }

  confirmDelete(callback: () => void): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận xoá',
      nzContent: 'Bạn có chắc chắn muốn xoá mục này?',
      nzOkText: 'Xoá',
      nzOkDanger: true,
      nzCancelText: 'Huỷ',
      nzOnOk: () => {
        callback();
      }
    });
  }

}
