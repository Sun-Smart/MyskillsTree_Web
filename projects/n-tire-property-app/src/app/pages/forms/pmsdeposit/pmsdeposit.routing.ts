import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pmsdepositComponent } from './pmsdeposit.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'pmsdeposits',children: [
{ path: '', component: pmsdepositComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: pmsdepositComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
