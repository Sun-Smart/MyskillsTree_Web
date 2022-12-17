import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpitembundledetailComponent } from './erpitembundledetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpitembundledetails',children: [
{ path: '', component: erpitembundledetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpitembundledetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
