import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erptendersupplierresponsedetailComponent } from './erptendersupplierresponsedetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erptendersupplierresponsedetails',children: [
{ path: '', component: erptendersupplierresponsedetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erptendersupplierresponsedetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
