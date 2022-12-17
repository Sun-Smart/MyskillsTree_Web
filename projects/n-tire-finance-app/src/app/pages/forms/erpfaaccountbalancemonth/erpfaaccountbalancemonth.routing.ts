import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpfaaccountbalancemonthComponent } from './erpfaaccountbalancemonth.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpfaaccountbalancemonths',children: [
{ path: '', component: erpfaaccountbalancemonthComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpfaaccountbalancemonthComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
