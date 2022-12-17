import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsadvertisementdetailComponent } from './hrmsadvertisementdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsadvertisementdetails',children: [
{ path: '', component: hrmsadvertisementdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsadvertisementdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsadvertisementdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsadvertisementdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
