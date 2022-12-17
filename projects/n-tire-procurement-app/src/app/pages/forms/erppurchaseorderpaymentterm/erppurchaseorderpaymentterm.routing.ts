import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erppurchaseorderpaymenttermComponent } from './erppurchaseorderpaymentterm.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erppurchaseorderpaymentterms',children: [
{ path: '', component: erppurchaseorderpaymenttermComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erppurchaseorderpaymenttermComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
