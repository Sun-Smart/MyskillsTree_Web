import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ltymerchantproductComponent } from './ltymerchantproduct.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'ltymerchantproducts',children: [
{ path: '', component: ltymerchantproductComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: ltymerchantproductComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
