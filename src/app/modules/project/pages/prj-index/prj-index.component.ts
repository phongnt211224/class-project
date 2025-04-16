import {Component, Injector, OnInit, ViewContainerRef} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {ProjectService} from "@core/services/project/project.service";
import {CookieService} from "ngx-cookie-service";
import {BaseComponent} from "@core/components/base.component";
import {PrjFormComponent} from "@app/modules/project/pages/prj-form/prj-form.component";

@Component({
  selector: 'app-prj-index',
  templateUrl: './prj-index.component.html',
  styleUrls: ['./prj-index.component.scss']
})
export class PrjIndexComponent extends BaseComponent<any> implements OnInit {
  projects = [];
  projects1 = [];

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
    this.projects = [
      {
        id: 1,
        title: 'Project A',
        description: 'This is a description for project A.',
        image: 'https://via.placeholder.com/150', // Use a placeholder image
        status: 'In Progress',
        startDate: '2024-01-01',
        endDate: '2024-12-31'
      },
      {
        id: 2,
        title: 'Project B',
        description: 'This is a description for project B.',
        image: 'https://via.placeholder.com/150',
        status: 'Completed',
        startDate: '2023-01-01',
        endDate: '2023-12-31'
      },
      {
        id: 3,
        title: 'Project C',
        description: 'This is a description for project C.',
        image: 'https://via.placeholder.com/150',
        status: 'Pending',
        startDate: '2025-01-01',
        endDate: '2025-12-31'
      }
    ];
    this.projectService.getListData().subscribe(
      res=>{
        this.projects1 = res.results
      }
    )

  }

}
