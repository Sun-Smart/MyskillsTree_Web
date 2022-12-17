import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmstrainingfeedbacktraineeComponent } from './hrmstrainingfeedbacktrainee.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmstrainingfeedbacktrainees',children: [
{ path: '', component: hrmstrainingfeedbacktraineeComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmstrainingfeedbacktraineeComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmstrainingfeedbacktraineeComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmstrainingfeedbacktraineeComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
