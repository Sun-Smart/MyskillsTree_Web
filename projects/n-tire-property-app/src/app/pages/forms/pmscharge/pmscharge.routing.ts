import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pmschargeComponent } from './pmscharge.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'pmscharges',children: [
{ path: '', component: pmschargeComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: pmschargeComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
