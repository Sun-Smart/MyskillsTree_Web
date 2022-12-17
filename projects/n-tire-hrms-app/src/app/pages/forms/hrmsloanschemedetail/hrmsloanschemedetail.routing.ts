import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsloanschemedetailComponent } from './hrmsloanschemedetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsloanschemedetails',children: [
{ path: '', component: hrmsloanschemedetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsloanschemedetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsloanschemedetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsloanschemedetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
