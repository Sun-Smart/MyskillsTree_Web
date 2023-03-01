import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OtpvalidationService } from '../../service/otpvalidation.service';
import { SharedService } from '../../service/shared.service';
import { AppConstants } from '../../shared/helper';
import { SessionService } from '../core/services/session.service';
import { ToastService } from '../core/services/toast.service';
import { UserContextService } from '../core/services/user-context.service';

@Component({
  selector: 'app-verifyscreen',
  templateUrl: './verifyscreen.component.html',
  styleUrls: ['./verifyscreen.component.scss']
})
export class VerifyscreenComponent implements OnInit {
  validation_Form: FormGroup;
  submitted = false;
  sub: any;
  data: any = [];
  otp_data: any = [];
  verifyMob_Otp: any;
  verifyEmail_Otp: any;
  verifyEmail_data: any;
  mobileotp: any;
  confirmation_otp: any;
  mobile: any;
  email: any;
  theme: string;
  showSpinner: boolean = false;
  termCondition: any;
  verifyEmail_Otp1: string;
  verifyMob_Otp1: string;
  verifyEmail_data1: string;
  constructor(private router: Router, private fb: FormBuilder,
    private route: ActivatedRoute, private http: HttpClient,
    private sharedService: SharedService,
    private toastService: ToastService,
    private userContextService: UserContextService,
    public sessionService: SessionService,
    public otpService: OtpvalidationService,) {

    this.validation_Form = this.fb.group({
      mobileotp: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(6)]],
      emailotp: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(6)]],
    });
  }
  ngOnInit() {
    this.sub = this.route.queryParams.subscribe((params: any) => {
      const data1 = params['mobotp'];
      const data2 = params['emailotp']
      const data3 = params['email']
      this.verifyMob_Otp = data1.toString();
      this.verifyEmail_Otp = data2.toString();
      this.verifyEmail_data = data3;
    });
  }
  get f() { return this.validation_Form.controls; };

  onClick(event: any) { 

    this.termCondition = event.target.checked;

    console.log("this.termCondition",this.termCondition);
    
  };

  onSubmit(data: any) {

    this.submitted = true;
    this.showSpinner = true;
    this.mobile = this.validation_Form.value.mobileotp;
    this.email = this.validation_Form.value.emailotp;
    if ((this.email == this.verifyEmail_Otp) && (this.termCondition == true)) {
      this.http.get(AppConstants.ntirebizURL + '/Token/LoginwithOTP?email=' + this.verifyEmail_data + '&otpm=' + this.verifyMob_Otp + '&otpe=' + this.verifyEmail_Otp)
        .subscribe((resp: any) => {
          this.showSpinner = false;
          this.confirmation_otp = resp;
          this.toastService.addSingle("success", "", "Otp Validated Successfully.");
          let user: any = resp;
          localStorage.setItem('login', 'true')
          localStorage.removeItem('token');
          localStorage.setItem('token', user.token)
          this.CheckAgreeOk(user);
        })
    } else if((this.email == this.verifyEmail_Otp) || (this.termCondition == false)){
      this.toastService.addSingle("success", "", "Accept Terms & Conditions.");
      this.showSpinner = false;
      return
    } else  {
      this.toastService.addSingle("success", "", "Email OTP mismatch.");
      this.showSpinner = false;
      return
    }
  };

  CheckAgreeOk(user: any) {
    if (user.token != '') {
      this.toastService.addSingle("success", "", "Login successfully.");
    }
    this.userContextService.setUser(user.token);
    var language = user.language;
    if (language != null && language.length > 0) {
      this.sharedService.translate.use(language);

    } else {
      this.sessionService.setItem("ng-prime-language", "en");
    }
    let loginuser = this.sessionService.getSession();
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

    if (loginuser.nextloginchangepassword == 'True') {
      this.router.navigate(['/resetpassword']);
      return;
    }
    if (loginuser.defaultpage == null || !loginuser.defaultpage) {
      this.router.navigate(['/home']);
    }
    else {
      this.router.navigate(['/home']);
    }
    return;
  }

  backLogin() {
    this.router.navigate(['/login']);
  }
}
