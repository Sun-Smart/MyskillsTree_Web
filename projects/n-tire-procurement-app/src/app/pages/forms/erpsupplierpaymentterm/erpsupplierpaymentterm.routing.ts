import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpsupplierpaymenttermComponent } from './erpsupplierpaymentterm.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpsupplierpaymentterms',children: [
{ path: '', component: erpsupplierpaymenttermComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpsupplierpaymenttermComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
