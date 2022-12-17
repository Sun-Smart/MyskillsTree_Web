import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmssalaryemployeeannualincomeComponent } from './hrmssalaryemployeeannualincome.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmssalaryemployeeannualincomes',children: [
{ path: '', component: hrmssalaryemployeeannualincomeComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmssalaryemployeeannualincomeComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmssalaryemployeeannualincomeComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmssalaryemployeeannualincomeComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
