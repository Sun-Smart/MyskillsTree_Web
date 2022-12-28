//import {NgCommonModule} from '../../../../../../n-tire-biz-app/src/app/appcommon.module';;
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../../n-tire-biz-app/src/app/auth/token.interceptor';
import { AuthService } from '../../../n-tire-biz-app/src/app/auth/auth.service';

import { BsDropdownModule } from "ngx-bootstrap";
import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbDate, NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { APP_ROUTER_PROVIDERS } from './app-routing.module';
import { CanDeactivateGuard } from '../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
import { CustomNgbDateParserFormatter } from '../../../n-tire-biz-app/src/app/custom/custom-ngbDateParserFormatter'
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateISOParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TreeNode } from 'primeng/api';
//import {WebcamModule} from 'ngx-webcam';
//
//import { NgPrimeModule, routedComponents, ENTRY_COMPONENTS } from './app.ngprime.module'

import { LoginComponent } from '../../../n-tire-biz-app/src/app/pages/login/login.component';
import { RegisterComponent } from '../../../n-tire-biz-app/src/app/pages/register/register.component';
import { bouserregistrationComponent } from '../../../n-tire-biz-app/src/app/pages/forms/bouserregistration/bouserregistration.component';
import { bocompanyregistrationComponent } from '../../../n-tire-biz-app/src/app/pages/forms/bocompanyregistration/bocompanyregistration.component';

import { EmailVerificationComponent } from '../../../n-tire-biz-app/src/app/pages/email-verification/email-verification.component';
import { ForgotpasswordComponent } from '../../../n-tire-biz-app/src/app/pages/forgotpassword/forgotpassword.component';
import { ResendEmailVerificationComponent } from '../../../n-tire-biz-app/src/app/pages/resend-email-verification/resend-email-verification.component';
import { ResetPasswordComponent } from '../../../n-tire-biz-app/src/app/pages/reset-password/reset-password.component';

//

import { mainComponent } from '../../../n-tire-biz-app/src/app/pages/main/main.component';
import { RegisterUserComponent } from '../../../n-tire-biz-app/src/app/pages/register-user/register-user.component';

import { LayoutComponent } from '../../../n-tire-biz-app/src/app/pages/layout/layout/layout.component';
import { MenuComponent } from '../../../n-tire-biz-app/src/app/pages/layout/menu/menu.component';
import { HeaderComponent } from '../../../n-tire-biz-app/src/app/pages/layout/header/header.component';
import { FooterComponent } from '../../../n-tire-biz-app/src/app/pages/layout/footer/footer.component';
import { ToastModule } from 'primeng/toast';
//import { bokbmasterComponent } from './pages/forms/bokbmaster/bokbmaster.component';
import { Auth } from '../../../n-tire-biz-app/src/app/service/auth.service';
import { LoaderService } from '../../../n-tire-biz-app/src/app/pages/core/services/loader.service';
import { ToastService } from '../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { RouteStateService } from '../../../n-tire-biz-app/src/app/pages/core/services/route-state.service';

import { SessionService } from '../../../n-tire-biz-app/src/app/pages/core/services/session.service';

//import { HeaderBreadcrumbComponent } from '../../../n-tire-biz-app/src/app/pages/layout/header-breadcrumb/header-breadcrumb.component';

import { UserIdleModule } from 'angular-user-idle';
import { ThemeService } from '../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { ApplicationStateService } from '../../../n-tire-biz-app/src/app/pages/core/services/application-state.service';
import { UserDataService } from '../../../n-tire-biz-app/src/app/pages/core/services/user-data.service'
//import { MenuDataService } from '../../../n-tire-biz-app/src/app/pages/core/services/menu-data.service';

/*import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';*/

import { UserContextService } from '../../../n-tire-biz-app/src/app/pages/core/services/user-context.service';
import { AuthGuard } from '../../../n-tire-biz-app/src/app/pages/core/gaurds/auth.gaurd';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/*import { BOReportViewerComponent } from './pages/forms/boreportviewer/boreportviewer.component';
import { bomenumasterComponent } from './pages/forms/bomenumaster/bomenumaster.component';
import { bocountryComponent } from './pages/forms/bocountry/bocountry.component';*/
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';

//import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
//import { InternationalPhoneModule  } from 'ng4-intl-phone';
import { NgxCurrencyModule } from "ngx-currency";
import { SharedService } from '../../../n-tire-biz-app/src/app/service/shared.service';


import { NgCommonModule } from '../../../n-tire-biz-app/src/app/appcommon.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { JwtModule } from "@auth0/angular-jwt";
//import { KeyboardShortcutsModule }     from 'ng-keyboard-shortcuts';


import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { NgxSpinnerModule } from "ngx-spinner";

import {AutoCompleteModule} from 'primeng/autocomplete';
import { ApplicantregisterComponent } from './pages/forms/applicantregister/applicantregister.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SkillenhancerComponent } from './pages/skillenhancer/skillenhancer.component';
import { CertifierComponent } from './pages/certifier/certifier.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { VerifyscreenComponent } from './pages/verifyscreen/verifyscreen.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
export function tokenGetter() {
    var value = localStorage.getItem("currentUser");
    return value;
    //return localStorage.getItem("access_token");
}
@NgModule({
    declarations: [

        AppComponent,
        LoginComponent,
        bouserregistrationComponent,
        bocompanyregistrationComponent,
        ApplicantregisterComponent,
        mainComponent,
        RegisterComponent,
        SkillenhancerComponent,
        CertifierComponent,
        RegisterUserComponent,
        VerifyscreenComponent,
        EmailVerificationComponent, ForgotpasswordComponent, ResendEmailVerificationComponent, ResetPasswordComponent,

        //bokbmasterComponent,
        HeaderComponent, FooterComponent,
        LayoutComponent,
        MenuComponent,
        //routedComponents
    ],
    exports: [
        //NgCommonModule
        //LoginComponent,
        NgScrollbarModule,
        HeaderComponent, FooterComponent, LayoutComponent
    ],
    imports: [
        //layoutModule,
        //
        //WebcamModule,
        NgCommonModule.forRoot(),
        NgbModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule, ReactiveFormsModule, ToastModule, NgxSpinnerModule,
        //,
        //NgxIntlTelInputModule,BsDropdownModule.forRoot(),
        //InternationalPhoneModule ,
        //NgPrimeModule,
        NgMultiSelectDropDownModule.forRoot(),
        NgbDatepickerModule,
        OverlayPanelModule,
        HttpClientModule,
        NgScrollbarModule,
        AppRoutingModule,
        AutoCompleteModule,
        // Optionally you can set time for `idle`, `timeout` and `ping` in seconds.
        // Default values: `idle` is 600 (10 minutes), `timeout` is 300 (5 minutes)
        // and `ping` is 120 (2 minutes).
        UserIdleModule.forRoot({ idle: 6000, timeout: 3000, ping: 1200 }),
        Ng2SearchPipeModule,

        //WebcamModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ["example.com"],
                blacklistedRoutes: ["example.com/examplebadroute/"]
            }
        }),
        // KeyboardShortcutsModule.forRoot() ,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    //
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        Auth,
        AuthService,
        MessageService, DatePipe,
        AuthGuard,
        LoaderService,
        ToastService, RouteStateService,
        SessionService,
        ThemeService, ApplicationStateService, UserDataService, UserContextService,
        DynamicDialogRef, DynamicDialogConfig, DialogService, SharedService,
        CanDeactivateGuard,
        { provide: NgbDateParserFormatter, useFactory: () => new CustomNgbDateParserFormatter('longDate') }
    ],
    entryComponents: [
        //  ...ENTRY_COMPONENTS
        bouserregistrationComponent,
        bocompanyregistrationComponent
    ],
    bootstrap: [AppComponent]
})
//, [APP_ROUTER_PROVIDERS]
/*
@Injectable({
    providedIn: 'root',
  })
*/
export class AppModule { }
/*
export { LoaderService } from '../../../n-tire-biz-app/src/app/pages/core/services/loader.service';
export { ToastService } from '../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
export { RouteStateService } from '../../../n-tire-biz-app/src/app/pages/core/services/route-state.service';
export { SessionService } from '../../../n-tire-biz-app/src/app/pages/core/services/session.service';
export { ThemeService } from '../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
export { ApplicationStateService } from '../../../n-tire-biz-app/src/app/pages/core/services/application-state.service';
export { UserDataService } from '../../../n-tire-biz-app/src/app/pages/core/services/user-data.service'
export { UserContextService } from '../../../n-tire-biz-app/src/app/pages/core/services/user-context.service';
export { MessageService } from 'primeng/dynamicDialog';
*/
