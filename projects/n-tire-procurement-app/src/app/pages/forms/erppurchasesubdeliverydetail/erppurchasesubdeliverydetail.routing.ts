import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erppurchasesubdeliverydetailComponent } from './erppurchasesubdeliverydetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erppurchasesubdeliverydetails',children: [
{ path: '', component: erppurchasesubdeliverydetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erppurchasesubdeliverydetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
