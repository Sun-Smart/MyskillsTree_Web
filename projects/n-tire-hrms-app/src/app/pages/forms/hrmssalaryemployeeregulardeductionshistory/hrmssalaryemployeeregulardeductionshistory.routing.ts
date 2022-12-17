import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmssalaryemployeeregulardeductionshistoryComponent } from './hrmssalaryemployeeregulardeductionshistory.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmssalaryemployeeregulardeductionshistorys',children: [
{ path: '', component: hrmssalaryemployeeregulardeductionshistoryComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmssalaryemployeeregulardeductionshistoryComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmssalaryemployeeregulardeductionshistoryComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmssalaryemployeeregulardeductionshistoryComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
