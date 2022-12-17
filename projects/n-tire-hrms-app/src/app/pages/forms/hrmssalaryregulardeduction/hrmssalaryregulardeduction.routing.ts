import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmssalaryregulardeductionComponent } from './hrmssalaryregulardeduction.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmssalaryregulardeductions',children: [
{ path: '', component: hrmssalaryregulardeductionComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmssalaryregulardeductionComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmssalaryregulardeductionComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmssalaryregulardeductionComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
