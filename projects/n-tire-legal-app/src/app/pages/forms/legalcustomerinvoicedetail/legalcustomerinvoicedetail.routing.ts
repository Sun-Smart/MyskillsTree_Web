import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { legalcustomerinvoicedetailComponent } from './legalcustomerinvoicedetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'legalcustomerinvoicedetails',children: [
{ path: '', component: legalcustomerinvoicedetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: legalcustomerinvoicedetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: legalcustomerinvoicedetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
