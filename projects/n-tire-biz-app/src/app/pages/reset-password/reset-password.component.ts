// import { Component, Injectable, OnInit, TemplateRef, Input } from '@angular/core';
// import { Location } from '@angular/common';
// import { PasswordResetRequest, Auth, defaultSpTokenResolver } from './../../service/auth.service';
// import { SessionService } from '../../pages/core/services/session.service';
// import { Router, ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'reset-password',
//   template: `<ng-template #defaultTemplate>
//   <center>
//   <h1 class="layout-topbar-logo ng-tns-c186-0"><img src="assets/logo.png"
//   style="width: 300px;" /></h1>
  
// <h1 class="font-weight-600 mb-4 center">Reset Password</h1>
// </center>
// <div class="row">
//   <div class="col-sm-offset-4 col-xs-12">
//     <p *ngIf="verifying" class="this.sharedService.alert this.sharedService.alert-warning text-center">We are verifying your password reset link</p>
//     <p class="this.sharedService.alert this.sharedService.alert-success" *ngIf="reset">Your new password has been set, you may now login.</p>
//     <div *ngIf="verificationFailed" class="this.sharedService.alert this.sharedService.alert-danger">
//       This password reset link is not valid, please request a new reset link.
//     </div>
//   </div>
// </div>
// <div class="row center">
//   <div class="col-xs-12">
//     <form class="form-horizontal" *ngIf="verified && !reset" (ngSubmit)="onSubmit()" autocomplete="off">
//       <div class="form-group">
//         <label for="spUsername" class="col-xs-12 control-label">New Password</label>
//         <div class="col-xs-12 input-group">
//           <input class="form-control" name="password"  id="password" [(ngModel)]="formModel.password"
//                  placeholder="New Password"  [type]="pwdfieldTextType ? 'text' : 'password'"  [disabled]="posting">
//                  <div class="input-group-append">
//                  <span class="input-group-text">
//                    <i class="fa" style="font-size: 17px !important;" [ngClass]="{
//                      'fa-eye-slash': !pwdfieldTextType,
//                      'fa-eye': pwdfieldTextType
//                    }" (click)="togglepwdFieldTextType()"></i>
//                  </span>
//                </div>       
//         </div>
//       </div>
//       <span *ngIf="donotMatch" style="color: red;">Password do not match.</span>
//       <div class="form-group">
//         <label for="spPassword" class="col-xs-12 control-label">Confirm New Password</label>
//         <div class="col-xs-12 input-group">
//           <input class="form-control" name="confirmPassword" id="confirmPassword" [(ngModel)]="formModel.confirmPassword"
//                  placeholder="Confirm New Password"  [type]="pwdconfirmfieldTextType ? 'text' : 'password'"  [disabled]="posting">
//                  <div class="input-group-append">
//                  <span class="input-group-text">
//                    <i class="fa" style="font-size: 17px !important;" [ngClass]="{
//                      'fa-eye-slash': !pwdconfirmfieldTextType,
//                      'fa-eye': pwdconfirmfieldTextType
//                    }" (click)="togglepwdconfirmFieldTextType()"></i>
//                  </span>
//                </div>       
//         </div>
//       </div>
//       <div class="form-group">
//         <div class="col-sm-offset-4">
//           <p class="this.sharedService.alert this.sharedService.alert-danger" *ngIf="error">{{error}}</p>
//           <button type="submit" class="btn btn-primary" [disabled]="posting">Set New Password</button>
//         </div>
//       </div>
//     </form>
//   </div>
// </div>
// </ng-template>
// <ng-template
//   [ngTemplateOutlet]="customTemplate || defaultTemplate">
// </ng-template>`
// })
// @Injectable()
// export class ResetPasswordComponent implements OnInit {
//   /**
//    * A reference to a `<ng-template>` tag that if set will override this component's template. Use like so:
//    * ```
//    * <ng-template #customTemplate>
//    *   // custom HTML with login form
//    * </ng-template>
//    * ```
//    * Then pass customTemplate to the `reset-password` component like so `[customTemplate]="customTemplate"`
//    */
//   @Input() customTemplate: TemplateRef<any>;
//   protected disabled: boolean;
//   protected error: string;
//   protected formModel: PasswordResetRequest;
//   protected posting: boolean;
//   protected reset: boolean;
//   protected verifying: boolean;
//   protected verified: boolean;
//   protected verificationFailed: boolean;
//   protected sptoken: string;

//   pwdfieldTextType: boolean;
//   pwdconfirmfieldTextType: boolean;
//   donotMatch: boolean=false;
//   constructor(public auth: Auth, public location: Location, public sessionService: SessionService, private router: Router,) {
//   }

//   ngOnInit(): void {
//     this.verifying = false;
//     this.verified = false;
//     this.verificationFailed = false;

//     // debugger
//     console.log(this.sessionService.getItem("currentUser"));
//     console.log(JSON.parse(this.sessionService.getItem("currentUser")));
//     var sptoken = this.spTokenResolver();
//     debugger;
//     if (sptoken == "") {
//       this.formModel = {
//         sptoken: JSON.parse(this.sessionService.getItem("currentUser")),
//         password: '',
//         confirmPassword:''
//       };
//       this.verified = true;
//     }
//     else if (sptoken != "") {
//       this.formModel = {
//         sptoken: this.spTokenResolver(),
//         password: '',
//         confirmPassword:''
//       };
//       this.verify();
//     }

//     console.log(this.formModel);
//   }

//   spTokenResolver(): string {
//     return defaultSpTokenResolver(this.location);
//   }

//   verify(): void {
//     debugger;
//     this.verifying = true;
//     this.auth.verifyPasswordResetToken(this.formModel.sptoken)
//       .subscribe(() => {
//         this.verifying = false;
//         this.verified = true;
//       }, (error) => {
//         this.verifying = false;
//         if (error.status && error.status === 404) {
//           this.verificationFailed = true;
//         } else {
//           this.error = error.message;
//         }
//       });
//   }

//   send(): void {
//     debugger;
//     this.auth.resetPassword(this.formModel)
//       .subscribe(
//         () => {
//           this.posting = false;
//           this.reset = true;
//         },
//         (error) => {
//           this.posting = false;
//           this.error = error.message;
//         }
//       );
//   }

//   togglepwdFieldTextType() {
//     this.pwdfieldTextType = !this.pwdfieldTextType;
//   }


//   togglepwdconfirmFieldTextType() {
//     this.pwdconfirmfieldTextType = !this.pwdconfirmfieldTextType;
//   }


//   onSubmit(): void {
//     if(this.formModel.password == this.formModel.confirmPassword){ 
//       console.log('matched');
//     this.send();
//     this.router.navigate(['/home']);
//     }else{
//       console.log('not match');
//       this.donotMatch=true;
//       // this.toastService.addSingle('error', '', 'Password do not match.');
//       return;
//     }
//   }
// }

//New code


import { Component, Injectable, OnInit, TemplateRef, Input } from '@angular/core';
import { Location } from '@angular/common';
import { PasswordResetRequest, Auth, defaultSpTokenResolver } from './../../service/auth.service';
import { SessionService } from '../../pages/core/services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'reset-password',
  template: `<ng-template #defaultTemplate>

  <div>
  <div class="bg-img"  style=" background: url(/assets/bg.jpg) !important;
    height: 100vh !important;
    background-size: cover !important;
    background-position: center !important; ">
    <div class="content"  style="

 position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    z-index: 999 !important;
    text-align: center !important;
    padding: 85px 28px !important;
    width: 378px !important;
    transform: translate(-50%,-50%) !important;
    background: rgba(255,255,255,0.04) !important;
    box-shadow: -1px 4px 28px 0px rgb(0 0 0 / 75%) !important;

     ">
      <ngx-spinner></ngx-spinner>
        <form class="form-horizontal" *ngIf="verified && !reset" (ngSubmit)="onSubmit()" autocomplete="off"  [formGroup]="reactiveForm">
        <div class="row">
          <div class="col">
            <h1><a routerlink="/" class="layout-topbar-logo ng-tns-c186-0" href="#/"><img src="assets/logo/myskilltree.png"
                  style=" width: 300px;" /></a></h1>
            <!-- <h1 class="font-weight-600 mb-4 center" style="color: #007bff !important;padding:10px!important;">Reset Password</h1> -->
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
<!-- test -->
            <div class="form-group">
        <label for="spUsername" class="col-xs-12 control-label"  style="margin-left: -205px;  ">New Password</label>
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
        <label for="spPassword" class="col-xs-12 control-label"  style="margin-left: -149px;">Confirm New Password</label>
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

</div>



</ng-template>
<ng-template
  [ngTemplateOutlet]="customTemplate || defaultTemplate">
</ng-template>`
})
@Injectable()
export class ResetPasswordComponent implements OnInit {
  /**
   * A reference to a `<ng-template>` tag that if set will override this component's template. Use like so:
   * ```
   * <ng-template #customTemplate>
   *   // custom HTML with login form
   * </ng-template>
   * ```
   * Then pass customTemplate to the `reset-password` component like so `[customTemplate]="customTemplate"`
   */
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
  donotMatch: boolean=false;

  reactiveForm: FormGroup;
  constructor(public auth: Auth, private builder: FormBuilder, public location: Location, public sessionService: SessionService, private router: Router,) {
  }

  ngOnInit(): void {
    this.verifying = false;
    this.verified = false;
    this.verificationFailed = false;

    this.reactiveForm = this.builder.group({
      // email: [null, Validators.required]
      password: [null, [Validators.required]],
      confirmPassword : [null, [Validators.required]]
    });


    // debugger
    console.log(this.sessionService.getItem("currentUser"));
    console.log(JSON.parse(this.sessionService.getItem("currentUser")));
    var sptoken = this.spTokenResolver();
    debugger;
    if (sptoken == "") {
      this.formModel = {
        sptoken: JSON.parse(this.sessionService.getItem("currentUser")),
        password: '',
        confirmPassword:''
      };
      this.verified = true;
    }
    else if (sptoken != "") {
      this.formModel = {
        sptoken: this.spTokenResolver(),
        password: '',
        confirmPassword:''
      };
      this.verify();
    }

    console.log(this.formModel);
  }

  spTokenResolver(): string {
    return defaultSpTokenResolver(this.location);
  }

  verify(): void {
    debugger;
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
    debugger;
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
    debugger
    if(this.formModel.password == this.formModel.confirmPassword){
      console.log('matched');
    this.send();
    this.router.navigate(['/login']);
    }else{
      console.log('not match');
      this.donotMatch=true;
      // this.toastService.addSingle('error', '', 'Password do not match.');
      return;
    }
  }
}


//end
