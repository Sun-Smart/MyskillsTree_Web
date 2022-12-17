import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpphysicalinventorydetailComponent } from './erpphysicalinventorydetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpphysicalinventorydetails',children: [
{ path: '', component: erpphysicalinventorydetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpphysicalinventorydetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
