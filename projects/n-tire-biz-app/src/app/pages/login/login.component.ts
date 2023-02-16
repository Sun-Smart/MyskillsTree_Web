import { Component, OnInit } from '@angular/core';

//import { UserDataService } from '../core/services/user-data.service';
import { bousermaster } from '../../../../../n-tire-biz-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../n-tire-biz-app/src/app/service/bousermaster.service';
//import { User } from '../core/models/user.model';
import { ToastService } from '../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { RouteStateService } from '../../../../../n-tire-biz-app/src/app/pages/core/services/route-state.service';
import { SessionService } from '../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { ThemeService } from '../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
//import { TranslateService } from '@ngx-translate/core';
import { UserContextService } from '../../../../../n-tire-biz-app/src/app/pages/core/services/user-context.service';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../../../../n-tire-biz-app/src/app/service/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { bouserregistrationComponent } from '../../../../../n-tire-biz-app/src/app/pages/forms/bouserregistration/bouserregistration.component';

import { bocompanyregistrationComponent } from '../../../../../n-tire-biz-app/src/app/pages/forms/bocompanyregistration/bocompanyregistration.component';
import { ForgotPasswordComponent } from '../../../../../n-tire-biz-app/src/app/pages/forgot-password/forgot-password.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicDialog';
import { NgxSpinnerService } from "ngx-spinner";
import { msttermComponent } from '../forms/mstterm/mstterm.component';
import { msttermnewComponent } from '../forms/mstterm/msttermnew.component';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../../shared/helper';
import { OtpvalidationService } from '../../service/otpvalidation.service';
import { mstcorporatemasterService } from '../../service/mstcorporatemaster.service';
import { mstapplicantskilldetailService } from '../../service/mstapplicantskilldetail.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./style.css']
  styles: [`

.container {
    width: 100% !important;
    overflow: hidden !important;
}

.register {
    padding: 3%;
}

.register-left {
    text-align: center;
    color: #fff;
    margin-top: 4%;
}

.validation{
    width: 100%;
     margin-top: 0.25rem;
     font-size: 80%;
     color: #dc3545;
 }

.register-left input {
    border: none;
    border-radius: 1.5rem;
    padding: 2%;
    width: 60%;
    background: #f8f9fa;
    font-weight: bold;
    color: #383d41;
    margin-top: 30%;
    margin-bottom: 3%;
    cursor: pointer;
}

.register-right {
    background: #f8f9fa;
    border-radius: 4%;
    height: auto;
    max-width: 30%;
    position: relative;
    left: 130px;
    bottom: 30px;
    box-shadow: 0px 0px 1px #7d7d7d, 0px 0px 1px #7d7d7d;
}

.register-left img {
    margin-top: -8%;
    width: 90%;
    height: 80vh;
}

@-webkit-keyframes mover {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-20px);
    }
}

@keyframes mover {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-20px);
    }
}

.register-left p {
    font-weight: lighter;
    padding: 12%;
    margin-top: -9%;
}

.btnRegister {
    float: right;
    margin-top: 10%;
    border: none;
    border-radius: 1.5rem;
    padding: 2%;
    background: #0062cc;
    color: #fff;
    font-weight: 600;
    width: 50%;
    cursor: pointer;
}

.register .nav-tabs {
    margin-top: 3%;
    border: none;
    background: #0062cc;
    border-radius: 1.5rem;
    width: 28%;
    float: right;
}

.register .nav-tabs .nav-link {
    padding: 2%;
    height: 34px;
    font-weight: 600;
    color: #fff;
    border-top-right-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
}

.register .nav-tabs .nav-link:hover {
    border: none;
}

.register .nav-tabs .nav-link.active {
    width: 100px;
    color: #0062cc;
    border: 2px solid #0062cc;
    border-top-left-radius: 1.5rem;
    border-bottom-left-radius: 1.5rem;
}

.register-heading {
    text-align: left;
    margin-top: 8% !important;
    margin-bottom: -15%;
    font-weight: 900;
    color: #495057;
    font-size: 21px !important;
}

.custom_header {
    margin-top: -26px;
    font-size: 20px;
    color: #14638f;
    font-weight: 600;
}

.custom_link {
    color: #51c410 !important;
    font-weight: 600;
}

#myTabContent {
     /* margin: 20px; */
}

/* navbar */
.custom-navbar {
    background-color: #ecf7fd;
}

.nav-link {
    color: #f7204e !important;
}

.custom-toggler.navbar-toggler {
    border-color: rgb(247, 32, 78);
}

.custom-toggler .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(247,32,78, 0.7)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}

.custom-toggler .navbar-toggler-icon {
    width: 18px !important;
}

.custom-toggler:hover {
    border-color: rgb(255, 255, 255);
    background-color: #f76a88;
}

.navbar-toggler-icon:hover {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255, 0.7)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}

#logo_custom {

}

@media only screen and (max-width: 760px) {
    #logo_custom {
        width: 40%;
    }
}

/* logo */
.logo {
    width: 50px;
    height: 50px;
}

.fixed-top {
    position: inherit !important;
}

.register_btn {
    background-color: #14638f !important;
    color: #fff !important;
    height: 40px;
}

input[type=checkbox],
input[type=radio] {
    /* Double-sized Checkboxes */
    -ms-transform: scale(1.3);
    /* IE */
    -moz-transform: scale(1.3);
    /* FF */
    -webkit-transform: scale(1.3);
    /* Safari and Chrome */
    -o-transform: scale(1.3);
    /* Opera */
    transform: scale(1.3);
    padding: 10px;
}

.reduce_radio {
    font-size: 14px;
}

.form-control {
    border: 1px solid #757575;
    border-radius: 5px;
}

h5 {
    display: flex;
    flex-direction: row;
}

h5:before,
h5:after {
    content: "";
    flex: 1 1;
    border-bottom: 2px solid #e4e4e4;
    margin: auto;
}

.forgot_label {
    a {
        color: #ed4141 !important;
        float: right !important;
        font-weight: 800;
        font-size: 14px;
        margin-top: 0.4rem;
    }

}
label{
    font-size: 13px;
    font-weight: 800;
}
.form-group{
    margin-bottom: 0rem !important;
}
.common_register_font{
    font-weight: 100 !important;
}




/* code added by dhana jan-13-2023 */
@media only screen and (max-width: 600px) {
  #logo_custom {
    width: 13% !important;
    margin-top: -6px;
  }

  .register-left img {
    width: 70% !important;
    height: 26vh !important;
    position: relative !important;
    left: -1px !important;
  }

  .register-right {
    max-width: 500px !important;
    left: 0px !important;
    bottom: 2px !important;
    height: 380px !important;
  }
  .register-heading{
    margin-top: 2% !important;
  }
  .custom_header{
    margin-top: -47px !important;
    font-size: 14px !important;
  }
  label{
    font-size: 12px !important;
  }
  footer{
    height: 35px !important;
    /* top: 570px !important; */
    text-align:center;
    bottom: 0px !important;
  }
  .container{
      position: fixed !important;
      bottom: 0px;
    }
  .all_rights{
      display:none !important;
  }
  .common_register_font{
    color: #000 !important;
    font-weight: bold !important;
  }
  .mobileViewText{
    position: relative;
    line-height: 0;
    margin:0px !important;
    bottom: 20px;
  }
  .mobileViewRemem{
    margin: 0px !important;
  }
}
    `]
})
export class LoginComponent implements OnInit {
  username: any;
  bologinForm: FormGroup;
  private readonly minlengthemail = 5;
  private readonly minlengthPassword = 10;
  locale: string;
  theme: string;
  email: any;
  password: any;
  loggedIn: boolean = false;
  sessiondata: any;
  pkcorporateid: any;
  fieldTextType: boolean;
  rememberMe: boolean = false;
  password2: string;
  email2: string;
  remem: any;
  applicantid: any;
  login_validation: boolean = false;
  emailvalidation: boolean = false;
  passvalidation: boolean = false;
  userData: any;
  verifyMob_Otp: any;
  verifyEmail_Otp: any;
  otp_resp: any = [];
  otparray: any = [];
  p12: any;
  verify_outputstring: any;
  employeeid: string;

  constructor(private sharedService: SharedService, private translate: TranslateService,
    private fb: FormBuilder,
    private userService: bousermasterService,
    private toastService: ToastService,
    private routeStateService: RouteStateService,
    public sessionService: SessionService,
    public otpService: OtpvalidationService,
    //public translate: TranslateService,
    private themeService: ThemeService,
    private userContextService: UserContextService,
    private router: Router, public dialogRef: DynamicDialogRef,
    public dialog: DialogService, private spinner: NgxSpinnerService,
    private http: HttpClient,
    private mstcorporatemasterservice: mstcorporatemasterService,
    private mstapplicantskilldetail_service: mstapplicantskilldetailService,
  ) {

    this.bologinForm = this.fb.group({
      // email: [null],
      // password: [null],
      username: [null],
      email: [null, [Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)]],
      password: [null, [Validators.required]],
      rememberMe: [null]
    });
    this.translate.setDefaultLang('en');
    this.theme = "omega";
    this.sessionService.setItem("selected-theme", this.theme);
  }
  ngOnInit() {
    debugger
    this.spinner.show();
    this.locale = this.sessionService.getItem("ng-prime-language");
    this.email = localStorage.getItem("email");
    this.password = localStorage.getItem("password");
    this.remem = localStorage.getItem("rememberMe");
    this.sessionService.setItem("attachedsaved", "true");

    // if (this.email2 != null || this.email2 != '' && this.password2 != null || this.password2 != '') {
    //     this.email = localStorage.getItem("email");
    //     this.password = localStorage.getItem("password");

    // }
    // if (this.remem === false) {
    //     this.rememberMe = true;
    // }
    /*
    this.sessiondata = this.sessionService.getSession();
    if(this.sessiondata!="")this.loggedIn=true;
    if(this.loggedIn)this.router.navigate(['/home']);
    */
    this.spinner.hide();
  }
  forgetPassword() {
    this.router.navigate(['forgotpassword']);
  }

  CheckAgreeOk(user: any) {
    debugger;
    if (user.token != '') {
      this.login_validation = false;
      this.toastService.addSingle("success", "", "Login successfully.");
    }
    else {
      this.toastService.addSingle("error", "", "Invalid Login Credentials");
      return;
    }

    this.userContextService.setUser(user.token);
    // this language will be used as a fallback when a translation isn't found in the current language
    console.log(user);
    var language = user.language;
    if (language != null && language.length > 0) {
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.sharedService.translate.use(language);

    } else {
      this.sessionService.setItem("ng-prime-language", "en");
    }

    debugger;
    let loginuser = this.sessionService.getSession();
    console.log('loginuser ', loginuser);

    this.sessionService.setItem("userid", loginuser.userid);
    this.sessionService.setItem("username", loginuser.username);
    this.sessionService.setItem("role", loginuser.role);
    this.sessionService.setItem("countrycode", loginuser.countrycode);
    this.sessionService.setItem("usersource", loginuser.usersource);
    this.sessionService.setItem("applicantid", loginuser.applicantid);
    this.sessionService.setItem("selected-theme", this.theme);
    this.sessionService.setItem("selected-layout", loginuser.layoutpage);
    this.sessionService.setItem("applicantid", loginuser.key);
    this.sessionService.setItem("user_type", loginuser.user_type);
    this.sessionService.setItem("email", loginuser.email);
    this.sessionService.setItem("mobilenumber", loginuser.mobilenumber);
    this.sessionService.setItem("emailid", loginuser.emailid);
    this.sessionService.setItem("employeeid", loginuser.employeeid);
    // localStorage.setItem("termid", user.terms.termid);

    //this.themeService.selectTheme(this.theme);


    if (loginuser.nextloginchangepassword == 'True') {
      this.router.navigate(['/resetpassword']);
      return;
    }
    // if (user.terms.terms) {
    if (loginuser.defaultpage == null || !loginuser.defaultpage) {
      if (loginuser.role == "2") {
        this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByApplicantID(loginuser.applicantid).then((res: any) => {
          console.log("response", res.mstapplicantskilldetail);
          if (res.mstapplicantskilldetail.length > 0) {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/home/personaldetails']);
          }
        });
      }
      if (loginuser.role == '3') {
        this.mstcorporatemasterservice.getListBy_userid(0 + this.sessionService.getItem("userid")).then(res => {
          debugger;
          console.log('resresres',res);
          this.pkcorporateid = res[0].corporateid;
          localStorage.setItem("coporateid", this.pkcorporateid);
          this.router.navigate(['/home']);
        });
      }else if(loginuser.role == '1'){
        this.mstcorporatemasterservice.getListBy_userid(0 + this.sessionService.getItem("userid")).then(res => {
          debugger;
          console.log('resresres',res);
          this.employeeid = res[0].employeeid;
          localStorage.setItem("employeeid", this.employeeid);
          this.router.navigate(['/home']);
        });
      }

      //this.routeStateService.add("Home", '/home/showdashboard/1', null, true);
      // if(localStorage.getItem('role') == '3' || localStorage.getItem('role') == '1'){
      //   this.router.navigate(['/home']);
      // }else{
      //   this.router.navigate(['/home/personaldetails']);
      // }
      if (this.rememberMe == false) {
        // console.log(this.bologinForm.get('rememberMe').value);
        this.rememberMe = false;
        this.email = localStorage.removeItem("email");
        this.password = localStorage.removeItem("password");
        this.remem = localStorage.removeItem("rememberMe");
      }
      // return;
    }
    //
    else {
      this.router.navigate(['/home']);
      // this.router.navigate(['/home/personaldetails']);
    }
    //this.routeStateService.add("Home", loginuser.defaultpage, null, true);

    //this.router.navigate([loginuser.defaultpage]);
    //
    return;
    // }
  }
  test() {
    this.emailvalidation = false
  }
  test1() {
    this.passvalidation = false
  }

  onSubmit() {
    debugger
    this.login_validation = true;

    this.rememberme(this.bologinForm.get('rememberMe').value);
    if (this.bologinForm.invalid) {
      this.emailvalidation = !this.emailvalidation;
      this.passvalidation = !this.passvalidation
    }
    this.spinner.show();
    //let user: bousermaster = this.userService.getUserByemailAndPassword(this.bologinForm.get('email').value, this.bologinForm.get('password').value);
    this.userService.login(this.bologinForm.get('email').value, this.bologinForm.get('password').value, this.bologinForm.get('rememberMe').value).then((res: any) => {
      this.spinner.hide();
      let user: any = res;
      localStorage.setItem('login', 'true')
      localStorage.removeItem('token');
      localStorage.setItem('token', user.token)
      if (user) {
        if (user.terms != null) {
          localStorage.setItem('terms', user.terms.terms);
          this.dialog.open(msttermnewComponent,
            {
              width: '100% !important',
              height: 'auto !important',
              data: { ScreenType: 2, save: true },
              contentStyle: { "padding": "0px" },
            }
          ).onClose.subscribe(res => {
            debugger
            if (res) {
              this.CheckAgreeOk(user);
            }
          });
        } else {
          // return;
          this.CheckAgreeOk(user);
        }
      } else {
        this.toastService.addSingle('error', '', 'Invalid user.');
        return;
      }
    }).catch((err) => {
      this.toastService.addSingle("error", "", err.error);
    });
  };

  rememberme(Remember) {
    debugger
    console.log('Remember ', Remember)
    if (Remember) {
      localStorage.setItem("email", this.bologinForm.get('email').value);
      localStorage.setItem('rememberMe', this.bologinForm.get('rememberMe').value)
      localStorage.setItem("password", this.bologinForm.get('password').value);
      this.rememberMe = true;
    } else if (this.rememberMe == false) {
      console.log(this.bologinForm.get('rememberMe').value);
      this.rememberMe = false;
      // this.email = localStorage.removeItem("email");
      // this.password = localStorage.removeItem("password");
      // this.remem = localStorage.removeItem("rememberMe");
    }
  }
  selectTheme(theme: string) {
    this.sessionService.setItem("selected-theme", theme);
    this.themeService.selectTheme(theme);
  }
  onLanguageChange($event) {
    this.locale = $event.target.value;
    if (this.locale == undefined || this.locale == null || this.locale.length == 0) {
      this.locale = "en";
    }
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    //this.translate.use(this.locale);
    this.sessionService.setItem("ng-prime-language", this.locale);
  }
  private onValueChanged(data?: any): void {
    if (!this.bologinForm) { return; }

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = this.bologinForm.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  get f() { return this.bologinForm.controls; }
  UserSignin() {
    /*
    this.dialog.open(bouserregistrationComponent,
        {
            data: { save: true, ScreenType: 1 },
        }
    )
    */
    this.dialog.open(bouserregistrationComponent,
      {
        data: { save: true, ScreenType: 2, formtemplate: '' },
      }
    )
    return false;
  }
  CompanySignin() {
    this.dialog.open(bocompanyregistrationComponent,
      {
        data: { save: true, ScreenType: 2, formtemplate: 'login' },
      }
    )
    return false;
  }

  formErrors = {
    'email': '',
    'password': ''
  };

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  validationMessages = {
    'email': {
      'required': 'email is required.',
      'minlength': 'email must be at least ' + this.minlengthemail + ' characters long.',
      'email': 'Enter valid email'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least ' + this.minlengthPassword + ' characters long.'
    }
  };
  gotoRegister() {
    this.router.navigate(['registernew']);
  };



  loginOtp(data: any) {
    this.password = "";
    this.spinner.show();



    if (data.value.email == null) {
      this.toastService.addSingle("success", " ", "Please Enter Email or Mobile Number.");
      this.spinner.hide();
    } else {
      let verify_data = {
        email: data.value.email,
        otpm: null,
        otpe: null,
      }

      console.log(verify_data);
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get(AppConstants.ntirebizURL + '/Token/LoginwithOTP?email=' + verify_data.email + '&otpm=' + verify_data.otpm + '&otpe=' + verify_data.otpe)
        .subscribe((resp: any) => {
          this.spinner.hide();


          this.otp_resp = resp;
          this.verifyMob_Otp = this.otp_resp.mobileotp;
          this.verifyEmail_Otp = this.otp_resp.emailotp;
          this.verify_outputstring = this.otp_resp.outputstring;

          this.toastService.addSingle("success", "", "OTP has send to your registered mail id and Mobilenumber.");

          if (this.verify_outputstring == "OTP has send to your registered mail id and Mobilenumber") {

            this.router.navigate(['verify'], { queryParams: { mobotp: this.verifyMob_Otp, emailotp: this.verifyEmail_Otp, email: verify_data.email }, skipLocationChange: true });
          };
        })
    };
  }
}
