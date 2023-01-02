import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { Auth, ErrorResponse } from '../../service/auth.service';
import { AppConstants } from '../../shared/helper';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  protected error: string;
  protected sent: boolean;
  showForgotError: boolean = false;
  submittedForgot = false;
  reactiveForm: FormGroup;
  emailvalidation: boolean = false;
  showError: boolean;
  successMsg: boolean;
  submitted = false;
  showSpinner: boolean = false;
  constructor(private router: Router, private http: HttpClient, public auth: Auth, public dialogRef: DynamicDialogRef, private spinner: NgxSpinnerService, private builder: FormBuilder) {
    // this.sent = false;
    this.reactiveForm = this.builder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });
  }

  ngOnInit(): void {
    this.showError = false;
  }
  get f() { return this.reactiveForm.controls; }
  onSubmit() {
    this.showError = false;
    this.submitted = true;
    // this.spinner.show();
    this.showSpinner = true;
    console.log(this.reactiveForm.value.email);
    if (this.reactiveForm.invalid) {
      return;
    }
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(AppConstants.ntireboURL + '/token/forgot?email=' + this.reactiveForm.value.email, {
      headers: options, responseType: 'text'
    }).subscribe((res: any) => {
      console.log(res);
      this.showSpinner = false;
      if (res == "Not an Registred user") {
        this.showError = true;
        this.successMsg = false;
        this.showSpinner = false;
        return;
      } else {
        if (res == "Password send to mail") {
          this.showSpinner = false;
          this.successMsg = true;
          this.showError = false;
          this.reactiveForm.reset(this.reactiveForm.value);
          this.reactiveForm.reset();
          this.reactiveForm.markAllAsTouched();
          alert('We have sent a password reset link to the email address of the account that you given.Please check your email and click on the link to reset the password.');
        }
      }
    }, (error: ErrorResponse) => {
      this.error = error.message;
      this.spinner.hide();
      this.showSpinner = false;
    });

  }
  backLogin() {
    this.router.navigate(['login']);
  }
}
