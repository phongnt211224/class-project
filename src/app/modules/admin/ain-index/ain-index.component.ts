import {Component, Injector, OnInit, ViewContainerRef} from '@angular/core';
import {Mode} from "@core/shared/constants/common";
import {BaseComponent} from "@core/components/base.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AinFormComponent} from "@app/modules/admin/ain-form/ain-form.component";
import {AdminService} from "@core/services/admin/admin.service";

@Component({
  selector: 'app-ain-index',
  templateUrl: './ain-index.component.html',
  styleUrls: ['./ain-index.component.scss']
})
export class AinIndexComponent extends BaseComponent<any> implements OnInit {
  formSearch: FormGroup;
  currentPage = 1;
  pageSize = 20;
  totalItems = 0;
  listData = [];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private adminService: AdminService,
    private fb: FormBuilder,
    injector: Injector,
  ) {
    super(injector);
    this.formConfig = {
      title: 'Người dùng',
      content: AinFormComponent
    }
  }

  ngOnInit(): void {
    this.search()
    this.initFormSearch()
  }

  initFormSearch() {
    this.formSearch = this.fb.group({
      keySearch: [null]
    })
  }


  search() {
    this.adminService.getListData({
      page: this.currentPage,
      pageSize: this.pageSize,
      keySearch: this.formSearch?.controls['keySearch']?.value
    }).subscribe(
      res => {
        this.listData = [...res.data]
        this.totalItems = res.totalProject;
      }
    )
  }


  deleteItem(id) {
    this.adminService.confirmDelete(() => {
      this.adminService.deleteById(id).subscribe(res => {
        this.message.success('Delete success')
        this.search()
      });
    });
  }

  protected readonly Mode = Mode;
}
