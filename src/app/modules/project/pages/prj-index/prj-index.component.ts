import {Component, HostListener, Injector, OnInit, ViewContainerRef} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {ProjectService} from "@core/services/project/project.service";
import {CookieService} from "ngx-cookie-service";
import {BaseComponent} from "@core/components/base.component";
import {PrjFormComponent} from "@app/modules/project/pages/prj-form/prj-form.component";
import {HTTP_STATUS_CODE, Mode} from "@core/shared/constants/common";
import {FormBuilder, FormGroup} from "@angular/forms";
import {StorageService} from "@core/services/storage.service";
import {ResearchFieldService} from "@core/services/project/researchField.service";
import * as moment from "moment";
import {compareDate} from "@core/shared/utils/validators.utils";

@Component({
  selector: 'app-prj-index',
  templateUrl: './prj-index.component.html',
  styleUrls: ['./prj-index.component.scss']
})
export class PrjIndexComponent extends BaseComponent<any> implements OnInit {

  listProjects = [];
  currentPage = 1;
  pageSize = 6;
  totalItems = 0;
  formSearch: FormGroup;
  dataUser = null;
  researchFieldList = [];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private researchFieldService: ResearchFieldService,
    private projectService: ProjectService,
    private fb: FormBuilder,
    injector: Injector,
  ) {
    super(injector);
    this.initDataSelect();
    this.formConfig = {
      title: 'Đồ án',
      content: PrjFormComponent
    }
  }


  ngOnInit(): void {
    this.initFormSearch();
    this.formSearch.reset();
    this.search();
    this.dataUser = StorageService.get('USER_LOGIN');
  }

  initDataSelect() {
    this.researchFieldService.getListData().subscribe(res => {
      if (res && res.code === HTTP_STATUS_CODE.SUCCESS) {
        this.researchFieldList = res.data;
      }
    })
  }

  initFormSearch() {
    this.formSearch = this.fb.group({
      keySearch: [null],
      researchField: [null],
      start_date:[null],
      end_date:[null]
    },
      {
        validators: compareDate('start_date', 'end_date', 'rangeDateError')
      })
  }

  get f() {
    return this.formSearch.controls;
  }

  search() {
    this.projectService.getListData({
      page: this.currentPage,
      pageSize: this.pageSize,
      keySearch: this.formSearch?.controls['keySearch']?.value,
      researchField: this.formSearch?.controls['researchField']?.value,
      start_date: this.formSearch?.controls['start_date']?.value ? moment(this.formSearch?.controls['start_date']?.value).format("DD/MM/yyyy") : null,
      end_date: this.formSearch?.controls['end_date']?.value ? moment(this.formSearch?.controls['end_date']?.value).format("DD/MM/yyyy") : null,
    }).subscribe(
      res => {
        this.listProjects = [...res.data]
        this.totalItems = res.totalProject;
      }
    )
  }

  onPageChange(pageIndex: number): void {
    this.currentPage = pageIndex;
    this.search();
  }

  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.currentPage = 1;
    this.search();
  }

  deleteItem(id) {
    this.projectService.confirmDelete(() => {
      this.projectService.deleteProject(id).subscribe(res => {
        this.message.success('Delete project success')
        this.search()
      });
    });
  }


  protected readonly Mode = Mode;
}
