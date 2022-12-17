import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpproductaccessComponent } from './erpproductaccess.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpproductaccesss',children: [
{ path: '', component: erpproductaccessComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpproductaccessComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
