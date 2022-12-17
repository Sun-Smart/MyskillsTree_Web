import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { crmcustomeraccounttransactionComponent } from './crmcustomeraccounttransaction.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'crmcustomeraccounttransactions',children: [
{ path: '', component: crmcustomeraccounttransactionComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: crmcustomeraccounttransactionComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: crmcustomeraccounttransactionComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
