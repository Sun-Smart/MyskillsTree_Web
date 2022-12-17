import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erptenderquotationdetailComponent } from './erptenderquotationdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erptenderquotationdetails',children: [
{ path: '', component: erptenderquotationdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erptenderquotationdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
