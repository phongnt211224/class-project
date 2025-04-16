import { Subscription } from 'rxjs';
import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  HostListener,
  Injector,
  OnDestroy,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {Mode} from "@core/shared/constants/common";


@Component({
  template: `
    <ng-content></ng-content>`
})
export class BaseComponent<T>  {
  protected modal!: NzModalService;
  modalRef!: NzModalRef;
  formConfig!: { title: string; content: any, isCloseModal?: boolean, config?: any };
  addWidth = 0;
  form!: FormGroup;
  isSubmitted = false;
  @ViewChild('footerTmpl', { static: true }) footerTpl!: TemplateRef<any>;

  constructor(protected readonly injector: Injector) {
    this.init();
  }

  init() {
    this.modal = this.injector.get(NzModalService);
  }

  search(){

  }

  doOpenFormDetail = (data: T) => {
    this.doOpenForm(Mode.VIEW, data);
  };
  doOpenFormEdit = (data: T) => {
    this.doOpenForm(Mode.EDIT, data);
  };

  doOpenForm(mode: Mode, data?: T) {
    console.log(data)
    if (this.formConfig) {
      this.modalRef = this.modal.create({
        nzWidth: this.getNzWidth() + (this.addWidth ? this.addWidth : 0),
        nzTitle: this.getModeTitle(mode) + " " + this.formConfig.title,
        nzContent: this.formConfig.content,
        nzMaskClosable: this.formConfig.isCloseModal,
        nzComponentParams: {
          mode,
          data,
          config: this.formConfig.config
        },
        nzFooter: mode !== Mode.VIEW ? this.footerTpl : null
      });
      this.modalRef.afterClose.subscribe((result) => {
          if (result?.refresh) {
            this.search()
          }
        }
      );
    } else {
      console.error('formConfig is empty')
    }
  }

  protected getModeTitle(mode: Mode): string {
    let title = '';
    switch (mode) {
      case Mode.ADD:
        title = 'Thêm mới';
        break;
      case Mode.EDIT:
        title = 'Chỉnh sửa';
        break;
      case Mode.VIEW:
        title = 'Xem chi tiết';
        break;
    }
    return title;
  }

  getNzWidth() {
    if (window.innerWidth > 767) {
      return window.innerWidth / 1.5 > 1100 ? 1100 : window.innerWidth / 1.5;
    }
    return window.innerWidth;
  }


}
