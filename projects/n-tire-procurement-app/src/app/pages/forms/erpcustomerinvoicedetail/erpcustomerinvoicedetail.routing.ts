import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpcustomerinvoicedetailComponent } from './erpcustomerinvoicedetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpcustomerinvoicedetails',children: [
{ path: '', component: erpcustomerinvoicedetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpcustomerinvoicedetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
