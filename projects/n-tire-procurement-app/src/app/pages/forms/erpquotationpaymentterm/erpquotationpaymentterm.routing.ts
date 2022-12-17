import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpquotationpaymenttermComponent } from './erpquotationpaymentterm.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpquotationpaymentterms',children: [
{ path: '', component: erpquotationpaymenttermComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpquotationpaymenttermComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
