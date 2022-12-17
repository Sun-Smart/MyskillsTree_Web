import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsstatutorydetailComponent } from './hrmsstatutorydetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsstatutorydetails',children: [
{ path: '', component: hrmsstatutorydetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsstatutorydetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsstatutorydetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsstatutorydetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
