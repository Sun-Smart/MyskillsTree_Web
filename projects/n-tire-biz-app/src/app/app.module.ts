import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../../n-tire-biz-app/src/app/auth/token.interceptor';
import { AuthService } from '../../../n-tire-biz-app/src/app/auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CanDeactivateGuard } from '../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
import { CustomNgbDateParserFormatter } from '../../../n-tire-biz-app/src/app/custom/custom-ngbDateParserFormatter'
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { LoginComponent } from '../../../n-tire-biz-app/src/app/pages/login/login.component';
import { RegisterComponent } from '../../../n-tire-biz-app/src/app/pages/register/register.component';
import { bouserregistrationComponent } from '../../../n-tire-biz-app/src/app/pages/forms/bouserregistration/bouserregistration.component';
import { bocompanyregistrationComponent } from '../../../n-tire-biz-app/src/app/pages/forms/bocompanyregistration/bocompanyregistration.component';

import { EmailVerificationComponent } from '../../../n-tire-biz-app/src/app/pages/email-verification/email-verification.component';
import { ForgotpasswordComponent } from '../../../n-tire-biz-app/src/app/pages/forgotpassword/forgotpassword.component';
import { ResendEmailVerificationComponent } from '../../../n-tire-biz-app/src/app/pages/resend-email-verification/resend-email-verification.component';
import { ResetPasswordComponent } from '../../../n-tire-biz-app/src/app/pages/reset-password/reset-password.component';

import { mainComponent } from '../../../n-tire-biz-app/src/app/pages/main/main.component';
import { RegisterUserComponent } from '../../../n-tire-biz-app/src/app/pages/register-user/register-user.component';

import { LayoutComponent } from '../../../n-tire-biz-app/src/app/pages/layout/layout/layout.component';
import { MenuComponent } from '../../../n-tire-biz-app/src/app/pages/layout/menu/menu.component';
import { HeaderComponent } from '../../../n-tire-biz-app/src/app/pages/layout/header/header.component';
import { ToastModule } from 'primeng/toast';
import { Auth } from '../../../n-tire-biz-app/src/app/service/auth.service';
import { LoaderService } from '../../../n-tire-biz-app/src/app/pages/core/services/loader.service';
import { ToastService } from '../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { RouteStateService } from '../../../n-tire-biz-app/src/app/pages/core/services/route-state.service';

import { SessionService } from '../../../n-tire-biz-app/src/app/pages/core/services/session.service';

import { UserIdleModule } from 'angular-user-idle';
import { ThemeService } from '../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { ApplicationStateService } from '../../../n-tire-biz-app/src/app/pages/core/services/application-state.service';
import { UserDataService } from '../../../n-tire-biz-app/src/app/pages/core/services/user-data.service'

import { UserContextService } from '../../../n-tire-biz-app/src/app/pages/core/services/user-context.service';
import { AuthGuard } from '../../../n-tire-biz-app/src/app/pages/core/gaurds/auth.gaurd';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../n-tire-biz-app/src/app/service/shared.service';

import { NgCommonModule } from '../../../n-tire-biz-app/src/app/appcommon.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { JwtModule } from "@auth0/angular-jwt";

import { NgxSpinnerModule } from "ngx-spinner";

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ApplicantregisterComponent } from './pages/forms/applicantregister/applicantregister.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SkillenhancerComponent } from './pages/skillenhancer/skillenhancer.component';
import { CertifierComponent } from './pages/certifier/certifier.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { VerifyscreenComponent } from './pages/verifyscreen/verifyscreen.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { bokbmasterComponent } from 'projects/n-tire-bo-app/src/app/pages/forms/bokbmaster/bokbmaster.component';
import { bokbtopicComponent } from './pages/forms/bokbtopic/bokbtopic.component';
import { MstCareerDetailsComponent } from './pages/forms/mst-career-details/mst-career-details.component';
import { MstCertificationsComponent } from './pages/forms/mst-certifications/mst-certifications.component';
import { MstEducationDetailsComponent } from './pages/forms/mst-education-details/mst-education-details.component';
import { MstLanguageDetailsComponent } from './pages/forms/mst-language-details/mst-language-details.component';
import { MstProjectDetailsComponent } from './pages/forms/mst-project-details/mst-project-details.component';
import { MstResumeComponent } from './pages/forms/mst-resume/mst-resume.component';
import { MstSkillDetsilsComponent } from './pages/forms/mst-skill-detsils/mst-skill-detsils.component';
import { MstSocialMediaComponent } from './pages/forms/mst-social-media/mst-social-media.component';
import { MstStartPagesComponent } from './pages/forms/mst-start-pages/mst-start-pages.component';
import {PickListModule} from 'primeng/picklist';
import {InputSwitchModule} from 'primeng/inputswitch';
import {BlockUIModule} from 'primeng/blockui';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
export function tokenGetter() {
    var value = localStorage.getItem("currentUser");
    return value;
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
        MstCareerDetailsComponent,MstCertificationsComponent,MstEducationDetailsComponent,
        MstLanguageDetailsComponent,MstProjectDetailsComponent,MstResumeComponent,
        MstSkillDetsilsComponent,MstSocialMediaComponent,MstStartPagesComponent,
        HeaderComponent,
        LayoutComponent,
        MenuComponent,
        bokbtopicComponent,bokbmasterComponent
    ],
    exports: [
        NgScrollbarModule,
        HeaderComponent, LayoutComponent
    ],
    imports: [
        NgCommonModule.forRoot(),
        NgbModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule, ReactiveFormsModule, ToastModule, NgxSpinnerModule,
        NgMultiSelectDropDownModule.forRoot(),
        NgbDatepickerModule,
        OverlayPanelModule,
        HttpClientModule,
        NgScrollbarModule,PickListModule,InputSwitchModule,BlockUIModule,
        AppRoutingModule,
        AutoCompleteModule,
        UserIdleModule.forRoot({ idle: 6000, timeout: 3000, ping: 1200 }),
        Ng2SearchPipeModule,
        NgApexchartsModule,
        NgxDatatableModule,
        TranslateModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ["example.com"],
                blacklistedRoutes: ["example.com/examplebadroute/"]
            }
        }),
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
        bouserregistrationComponent,
        bocompanyregistrationComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
