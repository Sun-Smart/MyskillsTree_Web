import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpiltdetailComponent } from './erpiltdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpiltdetails',children: [
{ path: '', component: erpiltdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpiltdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
