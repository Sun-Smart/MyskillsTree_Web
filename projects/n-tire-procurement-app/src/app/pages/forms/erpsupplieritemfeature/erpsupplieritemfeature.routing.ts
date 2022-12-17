import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpsupplieritemfeatureComponent } from './erpsupplieritemfeature.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpsupplieritemfeatures',children: [
{ path: '', component: erpsupplieritemfeatureComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpsupplieritemfeatureComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
