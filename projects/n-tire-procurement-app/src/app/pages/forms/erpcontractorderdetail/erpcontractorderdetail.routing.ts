import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpcontractorderdetailComponent } from './erpcontractorderdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpcontractorderdetails',children: [
{ path: '', component: erpcontractorderdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpcontractorderdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
