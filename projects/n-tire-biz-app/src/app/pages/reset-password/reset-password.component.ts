
//New code
import { Component, Injectable, OnInit, TemplateRef, Input } from '@angular/core';
import { Location } from '@angular/common';
import { PasswordResetRequest, Auth, defaultSpTokenResolver } from './../../service/auth.service';
import { SessionService } from '../../pages/core/services/session.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'reset-password',
  template: `<ng-template #defaultTemplate>
  <ngx-spinner></ngx-spinner>

<div class = "row">
<div class = "col-12 custom-navbar">
  <img class="navbar-brand logo" src="assets/companylogo.png" id="logo_custom" alt="logo"
  style="width: 50px;">
</div>
<div class = "col-6 front-img">
<img src="assets/register.png" alt="MySkillTree" class="logo-img"/>
</div>
<div class = "col-6 reset-details">
<form class="form-horizontal reset-form" *ngIf="verified && !reset" (ngSubmit)="onSubmit()" autocomplete="off"  [formGroup]="reactiveForm">
        <div class="row" style="margin: 30px !important;">
          <div class="col">
            <h1 class="font-weight-600 mb-4 center" style="color: #007bff !important;padding:10px!important;">Set New Password</h1>
<div class="row">
  <div class="col-sm-offset-4 col-xs-12">
    <p *ngIf="verifying" class="this.sharedService.alert this.sharedService.alert-warning text-center">We are verifying your password reset link</p>
    <p class="this.sharedService.alert this.sharedService.alert-success" *ngIf="reset">Your new password has been set,<br> you may now login.</p>
    <div *ngIf="verificationFailed" class="this.sharedService.alert this.sharedService.alert-danger">
      This password reset link is not valid,<br> please request a new reset link.
    </div>
  </div>
</div>
            <div class="form-group">
        <label for="spUsername" class="col-xs-12 control-label"  style="margin-right: 130px;">New Password</label>
        <div class="col-xs-12 input-group">
          <input class="form-control" name="password"  id="password" [(ngModel)]="formModel.password"
                 placeholder="New Password"  formControlName="password"  [type]="pwdfieldTextType ? 'text' : 'password'"  [disabled]="posting">
                 <div class="input-group-append">
                 <span class="input-group-text">
                   <i class="fa" style="font-size: 17px !important;" [ngClass]="{
                     'fa-eye-slash': !pwdfieldTextType,
                     'fa-eye': pwdfieldTextType
                   }" (click)="togglepwdFieldTextType()"></i>
                 </span>
               </div>
        </div>
      </div>
      <span *ngIf="donotMatch" style="color: red;">Password do not match.</span>
      <div class="form-group">
        <label for="spPassword" class="col-xs-12 control-label"  style="">Confirm New Password</label>
        <div class="col-xs-12 input-group">
          <input class="form-control" name="confirmPassword" id="confirmPassword"   formControlName="confirmPassword" [(ngModel)]="formModel.confirmPassword"
                 placeholder="Confirm New Password"  [type]="pwdconfirmfieldTextType ? 'text' : 'password'"  [disabled]="posting">
                 <div class="input-group-append">
                 <span class="input-group-text">
                   <i class="fa" style="font-size: 17px !important;" [ngClass]="{
                     'fa-eye-slash': !pwdconfirmfieldTextType,
                     'fa-eye': pwdconfirmfieldTextType
                   }" (click)="togglepwdconfirmFieldTextType()"></i>
                 </span>
               </div>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-4">
          <p class="this.sharedService.alert this.sharedService.alert-danger" *ngIf="error">{{error}}</p>
          <input class="btn btn-primary btn-block my-4"  style="line-height: 2.3 !important;  background-color: #0B5B8C;
                border-color: #0B5B8C;"   [disabled]="reactiveForm.invalid" type="submit" value="Reset Password">
        </div>
      </div>
          </div>
        </div>
      </form>
  </div>
</div>
</ng-template>
<ng-template
  [ngTemplateOutlet]="customTemplate || defaultTemplate">
</ng-template>`,
  styles: [`
.custom-navbar{background-color:#ecf7fd;height:5rem}.reset-form{background-color:#f8f9fa;border:1px solid #b5adad;border-radius:30px}.logo-img{width:100%;height:100%}.reset-details{display:flex;align-items:center;justify-content:center;bottom:40px}@media only screen and (max-width:760px){.custom-navbar{background-color:#ecf7fd;height:5rem}.reset-form{background-color:#f8f9fa;border:1px solid #b5adad;border-radius:30px}.logo-img{width:100%;height:100%;display:flex!important;margin:10% 60%!important}.reset-details{display:flex;align-items:center;justify-content:center;position:absolute;margin:auto;left:6.5rem;bottom:3rem}}
`]
})
@Injectable()
export class ResetPasswordComponent implements OnInit {
  @Input() customTemplate: TemplateRef<any>;
  protected disabled: boolean;
  protected error: string;
  protected formModel: PasswordResetRequest;
  protected posting: boolean;
  protected reset: boolean;
  protected verifying: boolean;
  protected verified: boolean;
  protected verificationFailed: boolean;
  protected sptoken: string;

  pwdfieldTextType: boolean;
  pwdconfirmfieldTextType: boolean;
  donotMatch: boolean = false;

  reactiveForm: FormGroup;
  constructor(public auth: Auth, private builder: FormBuilder, public location: Location, public sessionService: SessionService, private router: Router,) {
  }

  ngOnInit(): void {
    this.verifying = false;
    this.verified = false;
    this.verificationFailed = false;

    this.reactiveForm = this.builder.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
    var sptoken = this.spTokenResolver();
    if (sptoken == "") {
      this.formModel = {
        sptoken: JSON.parse(this.sessionService.getItem("currentUser")),
        password: '',
        confirmPassword: ''
      };
      this.verified = true;
    }
    else if (sptoken != "") {
      this.formModel = {
        sptoken: this.spTokenResolver(),
        password: '',
        confirmPassword: ''
      };
      this.verify();
    }
  }

  spTokenResolver(): string {
    return defaultSpTokenResolver(this.location);
  }

  verify(): void {
    this.verifying = true;
    this.auth.verifyPasswordResetToken(this.formModel.sptoken)
      .subscribe(() => {
        this.verifying = false;
        this.verified = true;
      }, (error) => {
        this.verifying = false;
        if (error.status && error.status === 404) {
          this.verificationFailed = true;
        } else {
          this.error = error.message;
        }
      });
  }

  send(): void {
    this.auth.resetPassword(this.formModel)
      .subscribe(
        () => {
          this.posting = false;
          this.reset = true;
        },
        (error) => {
          this.posting = false;
          this.error = error.message;
        }
      );
  }

  togglepwdFieldTextType() {
    this.pwdfieldTextType = !this.pwdfieldTextType;
  }


  togglepwdconfirmFieldTextType() {
    this.pwdconfirmfieldTextType = !this.pwdconfirmfieldTextType;
  }


  onSubmit(): void {
    if (this.formModel.password == this.formModel.confirmPassword) {
      this.send();
      this.router.navigate(['/login']);
    } else {
      this.donotMatch = true;
      return;
    }
  }
}


//end
