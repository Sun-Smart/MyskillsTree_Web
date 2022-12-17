import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpproductattributeComponent } from './erpproductattribute.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpproductattributes',children: [
{ path: '', component: erpproductattributeComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpproductattributeComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
