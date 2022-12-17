import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpfamergeaccountComponent } from './erpfamergeaccount.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpfamergeaccounts',children: [
{ path: '', component: erpfamergeaccountComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpfamergeaccountComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
