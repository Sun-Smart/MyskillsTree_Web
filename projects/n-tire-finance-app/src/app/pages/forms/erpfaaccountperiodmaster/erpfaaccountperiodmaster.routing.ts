import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpfaaccountperiodmasterComponent } from './erpfaaccountperiodmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpfaaccountperiodmasters',children: [
{ path: '', component: erpfaaccountperiodmasterComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpfaaccountperiodmasterComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
