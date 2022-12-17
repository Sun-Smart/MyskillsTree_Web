import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpfaaccountbalancefinyearComponent } from './erpfaaccountbalancefinyear.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpfaaccountbalancefinyears',children: [
{ path: '', component: erpfaaccountbalancefinyearComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpfaaccountbalancefinyearComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
