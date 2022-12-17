import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpfabudgetComponent } from './erpfabudget.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpfabudgets',children: [
{ path: '', component: erpfabudgetComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpfabudgetComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
