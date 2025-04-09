import {Component, OnInit} from '@angular/core';
import {environment} from "@env/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "@core/shared/services/auth.service";
import {ToastrService} from "ngx-toastr";
import {HTTP_STATUS_CODE} from "@core/shared/constants/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  bgLoginPath = environment.bgLogin;
  form: FormGroup = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  });
  isLoading = false;
  isFocus = false;
  isSubmitted = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private toastrService: ToastrService,
              private readonly router: Router,) {
  }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls;
  }


  submitForm() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.login();
      this.isSubmitted = false;
    }
  }

  login() {
    this.isLoading = true;
    const fromObject = {
      email: this.form.get('email')?.value.trim(),
      password: this.form.get('password')?.value.trim()
    };
    this.authService.login(fromObject).subscribe(res => {
      if (res && res.code === HTTP_STATUS_CODE.SUCCESS) {
        this.authService.clearData();
        this.authService.saveStorage(res);
        this.router.navigate(['/']);
      } else {
        this.toastrService.error("Có lỗi xảy ra!");
      }
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

  onLabelClick() {
    this.isFocus = !this.isFocus;
  }

  preventSpace(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  register() {
    this.router.navigateByUrl('/auth/register');
  }
}
