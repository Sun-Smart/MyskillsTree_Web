import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpqcdetailComponent } from './erpqcdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpqcdetails',children: [
{ path: '', component: erpqcdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpqcdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
