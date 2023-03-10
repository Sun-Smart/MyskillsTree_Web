import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule, enableProdMode } from '@angular/core';
import { AuthGuard } from '../../../n-tire-bo-app/src/app/pages/core/gaurds/auth.gaurd';
import { LoginComponent } from '../../../n-tire-procurement-app/src/app/pages/login/login.component';

import { mainComponent } from '../../../n-tire-bo-app/src/app/pages/main/main.component';
import { MultiFormComponent } from '../../../n-tire-bo-app/src/app/pages/layout/multiform/multiform.component';
import { RegisterUserComponent } from '../../../n-tire-bo-app/src/app/pages/register-user/register-user.component';
import { LayoutComponent } from '../../../n-tire-procurement-app/src/app/pages/layout/layout/layout.component';
//import { DashboardComponent } from '../../../n-tire-dashboards-app/src/app/pages/forms/dashboard/dashboard.component';
//import { BOReportViewerComponent } from './pages/forms/boreportviewer/boreportviewer.component';
//
//import { NgPrimeModule, paths } from './app.ngprime.module'

import { CanDeactivateGuard } from '../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
import { CanActivateGuard } from '../../../n-tire-bo-app/src/app/pages/common/canactivate';

import { EmailVerificationComponent } from '../../../n-tire-bo-app/src/app/pages/email-verification/email-verification.component';
import { ForgotPasswordComponent } from '../../../n-tire-bo-app/src/app/pages/forgot-password/forgot-password.component';
import { ResendEmailVerificationComponent } from '../../../n-tire-bo-app/src/app/pages/resend-email-verification/resend-email-verification.component';
import { ResetPasswordComponent } from '../../../n-tire-bo-app/src/app/pages/reset-password/reset-password.component';

enableProdMode();

const routes: Routes = [

    /* {
         path: 'home1', component: LayoutComponent,
         children: [
           //  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          //   { path: 'dashboard', component: DashboardComponent },
         ]
     },*/
    { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
    //component: LayoutComponent,
    {
        path: 'home',component: LayoutComponent,
        loadChildren: () => import('./app.layout.module').then(m => m.NgPrimeModule)
        //path: 'home', loadChildren: 'src/app/app.ngprime.module#NgPrimeModule' 
    },
    {
        path: 'workflow',
        loadChildren: () => import('./app.workflowlayout.module').then(m => m.NgWorkFlowModule)
        //path: 'home', loadChildren: 'src/app/app.ngprime.module#NgPrimeModule' 
    },
    /*  { 
          path: 'multiform', loadChildren: () => import('src/app/app.multiformlayout.module').then(m => m.NgMultiFormModule)         
          //path: 'home', loadChildren: 'src/app/app.ngprime.module#NgPrimeModule' 
      },  */

    { path: 'login', component: LoginComponent, },
    { path: 'forgotpassword', component: ForgotPasswordComponent, },
    { path: 'resendemail', component: ResendEmailVerificationComponent, },
    { path: 'resetpassword', component: ResetPasswordComponent, },
    { path: 'emailverify', component: EmailVerificationComponent, },

    //    { path: 'dashboards', component: DashboardComponent, },
    { path: 'register', component: RegisterUserComponent, },

    //  { path: '', component: mainComponent },

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    //{ path: '**', redirectTo: 'login' },
];
/*
for (let i = 1; i < 200; i++) {
    let children = [{ path: ':id', component: BOReportViewerComponent , pathMatch: 'prefix'}];
    children.push({ path: ':id/:fkname/:fk', component: BOReportViewerComponent , pathMatch: 'prefix'});
    (routes[0].children as any).push({ path: 'boreportviewer' + i, children: children , pathMatch: 'prefix'});
}
*/

//routes[0].children = routes[0].children.concat(paths);


const config: ExtraOptions = {
    useHash: true,
    onSameUrlNavigation: 'reload',
    //enableTracing: true
};

@NgModule({
    imports: [
        RouterModule.forRoot(routes, config)

    ],
    declarations: [
        //LayoutComponent
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
export const APP_ROUTER_PROVIDERS = [
    // provideRouter(routes),
    CanDeactivateGuard,
    CanActivateGuard
];