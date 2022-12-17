import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpfaaccountmasterComponent } from './erpfaaccountmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpfaaccountmasters',children: [
{ path: '', component: erpfaaccountmasterComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpfaaccountmasterComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
