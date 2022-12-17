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

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./style.css']
})
export class LoginComponent implements OnInit {
    bologinForm: FormGroup;
    private readonly minlengthemail = 5;
    private readonly minlengthPassword = 10;
    locale: string;
    theme: string;
    email: any;
    password: any;
    loggedIn: boolean = false;
    sessiondata: any;
    fieldTextType: boolean;
    rememberMe: boolean = false;
    password2: string;
    email2: string;
    remem: any;
    applicantid: any;

    constructor(private sharedService: SharedService, private translate: TranslateService,
        private fb: FormBuilder,
        private userService: bousermasterService,
        private toastService: ToastService,
        private routeStateService: RouteStateService,
        public sessionService: SessionService,
        //public translate: TranslateService,
        private themeService: ThemeService,
        private userContextService: UserContextService,
        private router: Router, public dialogRef: DynamicDialogRef,
        public dialog: DialogService, private spinner: NgxSpinnerService
    ) {

        this.bologinForm = this.fb.group({
            email: [null],
            password: [null],
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
        this.dialog.open(ForgotPasswordComponent,
            {
                data: { save: true, ScreenType: 1, formtemplate: 'login' },
            }
        )
        return false;

    }

    CheckAgreeOk(user) {
        debugger;
        if (user.token != '') {
            // localStorage.setItem('token', user.token)
            this.toastService.addSingle("success", "", "Login successfully.");
        }
        else {

            this.toastService.addSingle("error", "", "User not found");
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

    onSubmit() {
        debugger
        this.rememberme(this.bologinForm.get('rememberMe').value);
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
                            data: { ScreenType: 2, save: true }
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
            //
            //console.log(err);

            this.spinner.hide();
            this.toastService.addSingle("error", "", err.error);
        });


    }
    // saveRemember(event) {
    //     console.log('rememberOption ', event.target.checked);
    //     if (event.target.checked) {
    //         localStorage.setItem('email', this.bologinForm.get('email').value);
    //     }

    // }
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

}
