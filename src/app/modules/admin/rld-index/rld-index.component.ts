import {Component, Injector, OnInit, ViewContainerRef} from '@angular/core';
import {Mode} from "@core/shared/constants/common";
import {BaseComponent} from "@core/components/base.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AinFormComponent} from "@app/modules/admin/ain-form/ain-form.component";
import {AdminService} from "@core/services/admin/admin.service";
import {ResearchFieldService} from "@core/services/project/researchField.service";
import {RldFormComponent} from "@app/modules/admin/rld-form/rld-form.component";

@Component({
  selector: 'app-rld-index',
  templateUrl: './rld-index.component.html',
  styleUrls: ['./rld-index.component.scss']
})
export class RldIndexComponent extends BaseComponent<any> implements OnInit {
  formSearch: FormGroup;
  currentPage = 1;
  pageSize = 20;
  totalItems = 0;
  listData = [];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private researchFieldService: ResearchFieldService,
    private fb: FormBuilder,
    injector: Injector,
  ) {
    super(injector);
    this.formConfig = {
      title: 'Lĩnh vực',
      content: RldFormComponent
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
    this.researchFieldService.getListData({
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
    this.researchFieldService.confirmDelete(() => {
      this.researchFieldService.deleteById(id).subscribe(res => {
        this.message.success('Delete success')
        this.search()
      });
    });
  }

  protected readonly Mode = Mode;
}
