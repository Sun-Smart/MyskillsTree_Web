import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpsupplierfinancialdataComponent } from './erpsupplierfinancialdata.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpsupplierfinancialdatas',children: [
{ path: '', component: erpsupplierfinancialdataComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpsupplierfinancialdataComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
