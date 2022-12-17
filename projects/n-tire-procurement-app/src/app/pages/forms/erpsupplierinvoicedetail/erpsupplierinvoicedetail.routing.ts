import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpsupplierinvoicedetailComponent } from './erpsupplierinvoicedetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpsupplierinvoicedetails',children: [
{ path: '', component: erpsupplierinvoicedetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpsupplierinvoicedetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
