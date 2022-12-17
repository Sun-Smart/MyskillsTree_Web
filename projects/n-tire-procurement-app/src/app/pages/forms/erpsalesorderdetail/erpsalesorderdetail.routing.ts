import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpsalesorderdetailComponent } from './erpsalesorderdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpsalesorderdetails',children: [
{ path: '', component: erpsalesorderdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpsalesorderdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
