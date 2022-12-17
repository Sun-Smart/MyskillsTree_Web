import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ltyredeemComponent } from './ltyredeem.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'ltyredeems',children: [
{ path: '', component: ltyredeemComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: ltyredeemComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
