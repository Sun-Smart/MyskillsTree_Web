import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmssalaryemployeeregulardeductionComponent } from './hrmssalaryemployeeregulardeduction.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmssalaryemployeeregulardeductions',children: [
{ path: '', component: hrmssalaryemployeeregulardeductionComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmssalaryemployeeregulardeductionComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmssalaryemployeeregulardeductionComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmssalaryemployeeregulardeductionComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
