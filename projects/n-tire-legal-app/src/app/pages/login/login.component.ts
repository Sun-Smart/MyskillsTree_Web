import { Component, OnInit } from '@angular/core';

//import { UserDataService } from '../core/services/user-data.service';
import { bousermaster } from '../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//import { User } from '../core/models/user.model';
import { ToastService } from '../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { RouteStateService } from '../../../../../n-tire-bo-app/src/app/pages/core/services/route-state.service';
import { SessionService } from '../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { ThemeService } from '../../../../../n-tire-bo-app/src/app/pages/core/services/theme.service';
//import { TranslateService } from '@ngx-translate/core';
import { UserContextService } from '../../../../../n-tire-bo-app/src/app/pages/core/services/user-context.service';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../../../../n-tire-bo-app/src/app/service/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./stylesheet.css']
})
export class LoginComponent implements OnInit {
    bologinForm: FormGroup;
    private readonly minlengthUsername = 5;
    private readonly minlengthPassword = 10;
    locale: string;
    theme: string;

    loggedIn:boolean=false;
    sessiondata:any;

    constructor(private sharedService: SharedService, private translate: TranslateService,
        private fb: FormBuilder,
        private userService: bousermasterService,
        private toastService: ToastService,
        private routeStateService: RouteStateService,
        public sessionService: SessionService,
        //public translate: TranslateService,
        private themeService: ThemeService,
        private userContextService: UserContextService,
        private router: Router,
    ) {
        this.bologinForm = this.fb.group({
            username: [null],
            password: [null]
        });
        this.translate.setDefaultLang('en');
        this.theme = "admin-theme";
    }

    ngOnInit() {

        this.locale = this.sessionService.getItem("ng-prime-language");
        this.theme = "omega";
        /*
        this.sessiondata = this.sessionService.getSession();
        if(this.sessiondata!="")this.loggedIn=true;
        if(this.loggedIn)this.router.navigate(['/home']);
        */
    }

    onSubmit() {
        
        debugger;
        //let user: bousermaster = this.userService.getUserByUserNameAndPassword(this.bologinForm.get('username').value, this.bologinForm.get('password').value);
        this.userService.login(this.bologinForm.get('username').value, this.bologinForm.get('password').value).then((res:any) => {
            this.toastService.addSingle("success", "", "Login successfully.");
            let user: any = res;
            if (user) {
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
                this.sessionService.setItem("countrycode", loginuser.countrycode);
                this.sessionService.setItem("selected-theme", this.theme);
                this.sessionService.setItem("selected-layout", loginuser.layoutpage);
                this.themeService.selectTheme(this.theme);
                if (loginuser.defaultpage == null || !loginuser.defaultpage)
                    //this.routeStateService.add("Home", '/home/showdashboard/1', null, true);
                    this.router.navigate(['/home']);
                    //
                else
                    //this.routeStateService.add("Home", loginuser.defaultpage, null, true);
                    this.router.navigate(['/home']);
                //this.router.navigate([loginuser.defaultpage]);
                    //
                return;
            }
            this.toastService.addSingle('error', '', 'Invalid user.');
            return;
        });


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

    formErrors = {
        'username': '',
        'password': ''
    };

    validationMessages = {
        'username': {
            'required': 'Username is required.',
            'minlength': 'Username must be at least ' + this.minlengthUsername + ' characters long.'
        },
        'password': {
            'required': 'Password is required.',
            'minlength': 'Password must be at least ' + this.minlengthPassword + ' characters long.'
        }
    };

}
