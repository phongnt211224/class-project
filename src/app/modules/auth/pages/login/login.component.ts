import {Component, OnInit} from '@angular/core';
import {environment} from "@env/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  bgLoginPath = environment.bgLogin;
  form: FormGroup = this.fb.group({
    loginName: [null, Validators.required],
    password: [null, Validators.required]
  });
  isLoading = false;
  isFocus = false;
  isSubmitted = false;

  constructor(private fb: FormBuilder,
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
      this.isSubmitted = false;
    }
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
    this.router.navigateByUrl('/login/register');
  }
}
