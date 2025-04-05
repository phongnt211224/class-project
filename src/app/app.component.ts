import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [`
  ::ng-deep .snackbar-style {
    background-color: brown;
    color: white;
  }
  ::ng-deep .ant-modal-body {
    padding: 5px 24px 24px;
  }
  `]
})
export class AppComponent {
  title = 'class-project';
}
