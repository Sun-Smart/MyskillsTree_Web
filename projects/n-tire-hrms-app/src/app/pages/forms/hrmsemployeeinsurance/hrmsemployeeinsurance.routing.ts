import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsemployeeinsuranceComponent } from './hrmsemployeeinsurance.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsemployeeinsurances',children: [
{ path: '', component: hrmsemployeeinsuranceComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsemployeeinsuranceComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsemployeeinsuranceComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsemployeeinsuranceComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
