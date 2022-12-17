import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpfapaymentdetailComponent } from './erpfapaymentdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpfapaymentdetails',children: [
{ path: '', component: erpfapaymentdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpfapaymentdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: erpfapaymentdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: erpfapaymentdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
