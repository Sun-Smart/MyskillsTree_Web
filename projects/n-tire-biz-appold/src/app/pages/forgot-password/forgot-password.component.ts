import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ForgotPasswordFormModel, ErrorResponse, Auth } from './../../service/auth.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
@Component({
  selector: 'forgot-password-form',
  template: `<ng-template #defaultTemplate>
  <div  id='forgotBox'>
  <center>
  <h1><a routerlink="/" class="layout-topbar-logo ng-tns-c186-0" href="#/"><img src="assets/logo.png"
  style=" width: 300px;" /></a></h1>

<h2 class="font-weight-600 mb-4 center">Forgot Password</h2>
</center>
  <div class="row">
    <div class="col-xs-12">
      <p *ngIf="sent" class="this.sharedService.alert this.sharedService.alert-success">
      We have sent a password reset link to the email address of the account that you given.
      Please check your email and click on the link to reset the password.
      </p>
      <p *ngIf="sent" >
      <button  class="btn btn-primary"  [routerLink]='' (click)="onClose()"><i class="fa fa-close"></i> Close</button>
      </p>
    </div>
  </div>
  <div class="row center">
    <div class="col-12">
      <form class="form-horizontal" *ngIf="!sent" #form="ngForm" (ngSubmit)="onSubmit(form.value)" autocomplete="off">
        <div class="form-group">
          <label for="spEmail" class="col-sm-3 control-label">Email</label>
          <div class="col-12">
            <input class="form-control" name="email" type="email" maxlength=30 id="spEmail" [(ngModel)]="forgotPasswordFormModel.email"
                   placeholder="Your Email Address" [disabled]="posting" required>
                   <span *ngIf="showForgotError" style="color: #a94442 !important;">Enter your email id</span>
          </div>
        </div>
        <div class="form-group">
          <div class="col-12">
            <p class="text-danger" *ngIf="error">{{error}}</p>
            <button type="submit" class="btn btn-primary" [disabled]="posting" >Request Password Reset</button>
            <button  class="btn btn-primary"  type="button" (click)="onClose()"><i class="fa fa-close"></i> Close</button>

          </div>
        </div>
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
  /**
   * A reference to a `<ng-template>` tag that if set will override this component's template. Use like so:
   *
   * <ng-template #customTemplate>
   *   // custom HTML with login form
   * </ng-template>
   *
   * Then pass customTemplate to the `forgot-password-form` component like so `[customTemplate]="customTemplate"`
   */
  @Input() customTemplate: TemplateRef<any>;
  protected forgotPasswordFormModel: ForgotPasswordFormModel;
  protected error: string;
  protected sent: boolean;
  showForgotError: boolean =false;
  submittedForgot= false;
  constructor(public auth: Auth, public dialogRef: DynamicDialogRef,private spinner:NgxSpinnerService) {
    this.sent = false;
  }

  ngOnInit(): void {

    this.forgotPasswordFormModel = {
      email: ''
    };
  }

  send(): void {
    this.spinner.show();

    this.error = null;
    debugger;
    this.submittedForgot = false;

    this.auth.sendPasswordResetEmail(this.forgotPasswordFormModel)
      .subscribe((res)=>{
        this.spinner.show();
        this.sent = true
        this.spinner.hide();
      },(error:ErrorResponse)=>{
        this.error = error.message;
        this.spinner.hide();
      });

  }
  onClose() {

    this.dialogRef.close();
  }

  onSubmit(form: any): void {
  debugger
  this.spinner.show();
    if(form.email != ''){
      this.submittedForgot = true;
      this.showForgotError=false;
   this.spinner.show();
      this.send();

    }else{

      this.showForgotError = true;

      return;

    }
   }

}
