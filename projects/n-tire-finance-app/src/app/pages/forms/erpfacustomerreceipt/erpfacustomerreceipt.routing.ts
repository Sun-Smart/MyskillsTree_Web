import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpfacustomerreceiptComponent } from './erpfacustomerreceipt.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpfacustomerreceipts',children: [
{ path: '', component: erpfacustomerreceiptComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpfacustomerreceiptComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
