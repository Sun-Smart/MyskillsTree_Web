import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule, enableProdMode } from '@angular/core';
import { LoginComponent } from '../../../n-tire-biz-app/src/app/pages/login/login.component';
import { RegisterUserComponent } from '../../../n-tire-biz-app/src/app/pages/register-user/register-user.component';
import { LayoutComponent } from '../../../n-tire-biz-app/src/app/pages/layout/layout/layout.component';
import { CanDeactivateGuard } from '../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
import { CanActivateGuard } from '../../../n-tire-biz-app/src/app/pages/common/canactivate';
import { EmailVerificationComponent } from '../../../n-tire-biz-app/src/app/pages/email-verification/email-verification.component';
import { ResendEmailVerificationComponent } from '../../../n-tire-biz-app/src/app/pages/resend-email-verification/resend-email-verification.component';
import { ResetPasswordComponent } from '../../../n-tire-biz-app/src/app/pages/reset-password/reset-password.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyscreenComponent } from './pages/verifyscreen/verifyscreen.component';
import { ApplicantregisterComponent } from './pages/forms/applicantregister/applicantregister.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { SkillenhancerComponent } from './pages/skillenhancer/skillenhancer.component';
import { CertifierComponent } from './pages/certifier/certifier.component';
import { BonewbokbmasterComponent } from './pages/forms/bonewbokbmaster/bonewbokbmaster.component';

enableProdMode();

const routes: Routes = [

  { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  {
    path: 'home', component: LayoutComponent,
    loadChildren: () => import('./app.layout.module').then(m => m.NgPrimeModule)
  },
  {
    path: 'workflow',
    loadChildren: () => import('./app.workflowlayout.module').then(m => m.NgWorkFlowModule)
  },

  { path: 'login', component: LoginComponent, },
  { path: 'forgotpassword', component: ForgotpasswordComponent, },
  { path: 'resendemail', component: ResendEmailVerificationComponent, },
  { path: 'resetpassword', component: ResetPasswordComponent, },
  { path: 'emailverify', component: EmailVerificationComponent, },
  { path: 'register', component: RegisterUserComponent, },
  { path: 'registernew', component: RegisterComponent, },
  { path: 'enhancer', component: SkillenhancerComponent, },
  { path: 'certifier', component: CertifierComponent, },
  { path: 'applicantregister', component: ApplicantregisterComponent, },
  { path: 'verify', component: VerifyscreenComponent, },
  { path: 'verify/:id', component: VerifyscreenComponent, },
  { path: 'bokbmasters', pathMatch: 'prefix', loadChildren: () => import("./pages/forms/bonewbokbmaster/bonewkbmaster.module").then(m => m.BonewkbmasterModule) },
  { path: 'bokbtopics',  pathMatch: 'prefix',loadChildren: () => import('./pages/forms/bonewtopic/bonewtopic.module').then(m => m.BonewtopicModule) },
  { path: 'bofaqs',  pathMatch: 'prefix',loadChildren: () => import('./pages/forms/faq/faq.module').then(m => m.FaqModule) },

  { path: "mstapplicantreferencerequestsaccepted", pathMatch: 'prefix', loadChildren: () => import("./pages/mstapplicantreferenceaccepted/mstapplicantreferenceaccepted.module").then(m => m.mstapplicantreferencerequestModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
const config: ExtraOptions = {
  useHash: true,
  onSameUrlNavigation: 'reload',
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, config)
  ],
  declarations: [

  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
export const APP_ROUTER_PROVIDERS = [
  CanDeactivateGuard,
  CanActivateGuard
];
