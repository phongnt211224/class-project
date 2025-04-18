import {Component, Injector, OnInit, ViewContainerRef} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {ProjectService} from "@core/services/project/project.service";
import {CookieService} from "ngx-cookie-service";
import {BaseComponent} from "@core/components/base.component";
import {PrjFormComponent} from "@app/modules/project/pages/prj-form/prj-form.component";
import {HTTP_STATUS_CODE, Mode} from "@core/shared/constants/common";

@Component({
  selector: 'app-prj-index',
  templateUrl: './prj-index.component.html',
  styleUrls: ['./prj-index.component.scss']
})
export class PrjIndexComponent extends BaseComponent<any> implements OnInit {

  listProjects = [];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private projectService:ProjectService,
    injector: Injector,
  ) {
    super(injector);
    this.formConfig = {
      title:'Testing',
      content:PrjFormComponent
    }
  }

  ngOnInit(): void {
    this.search()
  }

  search() {
    this.projectService.getListData().subscribe(
      res=>{
        this.listProjects = [...res.data]
      }
    )
  }

  deleteItem(id) {
    this.projectService.confirmDelete(() => {
      this.projectService.deleteProject(id).subscribe(res => {
        console.log('abc')
          this.message.success('Delete project success')
          this.search()
      });
    });
  }

  protected readonly Mode = Mode;
}
