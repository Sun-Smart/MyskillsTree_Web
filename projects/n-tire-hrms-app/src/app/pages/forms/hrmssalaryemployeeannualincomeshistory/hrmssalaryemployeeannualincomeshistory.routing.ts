import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmssalaryemployeeannualincomeshistoryComponent } from './hrmssalaryemployeeannualincomeshistory.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmssalaryemployeeannualincomeshistorys',children: [
{ path: '', component: hrmssalaryemployeeannualincomeshistoryComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmssalaryemployeeannualincomeshistoryComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmssalaryemployeeannualincomeshistoryComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmssalaryemployeeannualincomeshistoryComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
