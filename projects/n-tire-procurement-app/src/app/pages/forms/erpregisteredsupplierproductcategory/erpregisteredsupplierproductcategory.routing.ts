import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpregisteredsupplierproductcategoryComponent } from './erpregisteredsupplierproductcategory.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpregisteredsupplierproductcategorys',children: [
{ path: '', component: erpregisteredsupplierproductcategoryComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpregisteredsupplierproductcategoryComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
