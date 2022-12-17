import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpfapaymentComponent } from './erpfapayment.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpfapayments',children: [
{ path: '', component: erpfapaymentComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpfapaymentComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
