import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpgoodsreceiptdetailComponent } from './erpgoodsreceiptdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpgoodsreceiptdetails',children: [
{ path: '', component: erpgoodsreceiptdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpgoodsreceiptdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
