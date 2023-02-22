//New code
import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ForgotPasswordFormModel, ErrorResponse, Auth } from './../../service/auth.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'forgot-password-form',
  template: `<ng-template #defaultTemplate>

<div  id='forgotBox'>
<div class="row" id="mstlogo" style="height: 62px !important;background: #2fb8ef ;  border-radius: 5px !important;">
   <h2 class="font-weight-600 mb-4 center" id="mstforgot" style="text-align: center !important; color: white;
    margin: auto !important;">Forgot Password</h2>
    <div  style="text-align: right; " *ngIf="sent" >
      <a class=""  [routerLink]='' (click)="onClose()"><i class="fa fa-times-circle close_common_icon2"></i></a>
</div>

</div>
  <div class="row">
    <div  *ngIf="sent" class="this.sharedService.alert this.sharedService.alert-success">
   <div  style=" margin-left: 13px; margin-right: 13px;">
    <h6> We have sent a password reset link to the email address of the account that you given.Please check your email and click on the link to reset the password.</h6>
   </div>
            </div>
  </div>
  <div  style="margin: 10px !important;"></div>
  <div class="row center">
    <div class="col-12">
      <form class="form-horizontal" *ngIf="!sent" #form="ngForm" (ngSubmit)="onSubmit(form.value)" autocomplete="off"  [formGroup]="reactiveForm">
        <div class="form-group" >
          <label for="spEmail" class="col-sm-3 control-label">Email</label>
          <div class="col-12">
            <input class="form-control" name="email"  formControlName="email"
            type="email" maxlength=30 id="spEmail" [(ngModel)]="forgotPasswordFormModel.email"
                   placeholder="Your Email Address" [disabled]="posting" required>
                   <span *ngIf="showForgotError" style="color: #a94442 !important;">Enter your email i d</span>
          </div>
        </div>
        <center>
        <div class="form-group">
          <div class="col-12">
            <p class="text-danger" *ngIf="error">{{error}}</p>
            <button type="submit" class="btn btn-primary" style=" line-height: 2.3 !important;  background-color: #0B5B8C;
                border-color: #0B5B8C;"  data-toggle="tooltip" data-placement="top" title="reset"  [disabled]="reactiveForm.invalid" >Request Password Reset</button>
            <button  class="btn btn-danger"  style="   line-height: 2.3 !important;  background-color: #red !important;
            border-color: red !important; " type="button" data-toggle="tooltip" data-placement="top" title=" close" (click)="onClose()"> Close</button>

          </div>
        </div>
        </center>
      </form>
    </div>
  </div>
</div>
<ngx-spinner> </ngx-spinner>
</ng-template>
<ng-template
  [ngTemplateOutlet]="customTemplate || defaultTemplate">
  <ngx-spinner> </ngx-spinner>
</ng-template>`

})
@Injectable()
export class ForgotPasswordComponent implements OnInit {
  @Input() customTemplate: TemplateRef<any>;
  protected forgotPasswordFormModel: ForgotPasswordFormModel;
  protected error: string;
  protected sent: boolean;
  showForgotError: boolean = false;
  submittedForgot = false;
  reactiveForm: FormGroup;
  constructor(public auth: Auth, public dialogRef: DynamicDialogRef, private spinner: NgxSpinnerService, private builder: FormBuilder) {
    this.sent = false;
  }

  ngOnInit(): void {

    this.forgotPasswordFormModel = {
      email: ''
    };

    this.reactiveForm = this.builder.group({
      email: [null, [Validators.required, this.emailValidator]]
    });
  }

  emailValidator(control) {
    if (control.value) {
      const matches = control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
      return matches ? null : { 'invalidEmail': true };
    } else {
      return null;
    }
  }
  send(): void {
    this.spinner.show();
    this.error = null;
    this.submittedForgot = false;
    this.auth.sendPasswordResetEmail(this.forgotPasswordFormModel)
      .subscribe((res) => {
        this.spinner.show();
        this.sent = true
        this.spinner.hide();
      }, (error: ErrorResponse) => {
        this.error = error.message;
        this.spinner.hide();
      });
  }
  onClose() {
    this.dialogRef.close();
  }

  onSubmit(form: any): void {
    this.spinner.show();
    if (form.email != '') {
      this.submittedForgot = true;
      this.showForgotError = false;
      this.spinner.show();
      this.send();
    } else {
      this.showForgotError = true;
      return;
    }
  }
}




//end


