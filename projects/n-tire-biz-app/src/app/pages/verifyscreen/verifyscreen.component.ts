import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  data: any;
  otp_data: any;
  verifyMob_Otp: any;
  verifyEmail_Otp: any;
  verifyEmail_data: any;
  mobileotp:any;
  confirmation_otp: any;
  mobile: any;
  email: any;
  theme: string;
  showSpinner:boolean = false;
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

    debugger
    this.sub = this.route.params.subscribe((params: any) => {
      this.data = params;
      console.log(this.data);

      if (this.data.id == 'otp') {

        this.otp_data = this.otpService.otparray;
        console.log("this.otp_data", this.otp_data);

        this.verifyMob_Otp = this.otp_data[0].mobileotp.toString();
        this.verifyEmail_Otp = this.otp_data[0].emailotp.toString();
        this.verifyEmail_data = this.otp_data[1].email;
      }
    });

    
    this.verifyMob_Otp1= localStorage.getItem("verifyMob_Otp");
    this.verifyEmail_Otp1 = localStorage.getItem("verifyEmail_Otp");
    this.verifyEmail_data1 = localStorage.getItem("verifyEmail_data");

    console.log("this.verifyMob_Otp", this.verifyMob_Otp1);
    console.log("this.verifyEmail_Otp", this.verifyEmail_Otp1);
  }

  // convenience getter for easy access to form fields
  get f() { return this.validation_Form.controls; }


  onSubmit(data:any) {
    debugger

    this.submitted = true;
    this.showSpinner = true;

    this.mobile = this.validation_Form.value.mobileotp;
    this.email = this.validation_Form.value.emailotp;

    if ((this.mobile == this.verifyMob_Otp) && (this.email == this.verifyEmail_Otp)) {
      debugger;

      
      this.http.get(AppConstants.ntirebizURL + '/Token/LoginwithOTP?email=' + this.verifyEmail_data + '&otpm=' + this.verifyMob_Otp + '&otpe=' + this.verifyEmail_Otp)
        .subscribe((resp: any) => {
          debugger
          this.showSpinner = false;
          this.confirmation_otp = resp;

          this.toastService.addSingle("success", "", "Otp Validated Successfully.");
          let user: any = resp;
            localStorage.setItem('login', 'true')
            localStorage.removeItem('token');
            localStorage.setItem('token', user.token)
            this.CheckAgreeOk(user);
        })
    } else{
      this.toastService.addSingle("success", "", "Email and Mobile OTP mismatch.");
      this.showSpinner = false;
    }
  };

  CheckAgreeOk(user:any) {
    debugger;
    if (user.token != '') {
        // localStorage.setItem('token', user.token)
        this.toastService.addSingle("success", "", "Login successfully.");
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
    this.sessionService.setItem("userid", loginuser.userid);
    this.sessionService.setItem("username", loginuser.username);
    this.sessionService.setItem("role", loginuser.role);
    this.sessionService.setItem("countrycode", loginuser.countrycode);
    this.sessionService.setItem("usersource", loginuser.usersource);
    this.sessionService.setItem("applicantid", loginuser.applicantid);
    this.sessionService.setItem("selected-theme", this.theme);
    this.sessionService.setItem("selected-layout", loginuser.layoutpage);
    this.sessionService.setItem("applicantid", loginuser.key);
    // localStorage.setItem("termid", user.terms.termid);

    //this.themeService.selectTheme(this.theme);

    if (loginuser.nextloginchangepassword == 'True') {
        this.router.navigate(['/resetpassword']);
        return;
    }
    // if (user.terms.terms) {
    if (loginuser.defaultpage == null || !loginuser.defaultpage) {
        //this.routeStateService.add("Home", '/home/showdashboard/1', null, true);
        this.router.navigate(['/home']);
        // return;
    }
    //
    else {
        this.router.navigate(['/home']);
    }
    //this.routeStateService.add("Home", loginuser.defaultpage, null, true);

    //this.router.navigate([loginuser.defaultpage]);
    //
    return;
    // }
}

backLogin(){
  this.router.navigate(['/login']);
}
}
