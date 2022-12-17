import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsinductionattendanceComponent } from './hrmsinductionattendance.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsinductionattendances',children: [
{ path: '', component: hrmsinductionattendanceComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsinductionattendanceComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsinductionattendanceComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsinductionattendanceComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
