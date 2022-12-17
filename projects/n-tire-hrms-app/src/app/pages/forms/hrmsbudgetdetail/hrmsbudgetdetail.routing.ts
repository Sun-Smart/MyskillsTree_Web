import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsbudgetdetailComponent } from './hrmsbudgetdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsbudgetdetails',children: [
{ path: '', component: hrmsbudgetdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsbudgetdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsbudgetdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsbudgetdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
