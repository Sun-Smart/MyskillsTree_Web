import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsinductionemployeeComponent } from './hrmsinductionemployee.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsinductionemployees',children: [
{ path: '', component: hrmsinductionemployeeComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsinductionemployeeComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsinductionemployeeComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsinductionemployeeComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
