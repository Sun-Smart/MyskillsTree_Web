import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpcontractordertermComponent } from './erpcontractorderterm.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpcontractorderterms',children: [
{ path: '', component: erpcontractordertermComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpcontractordertermComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
