import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { camspmscheduletaskComponent } from './camspmscheduletask.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'camspmscheduletasks',children: [
{ path: '', component: camspmscheduletaskComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: camspmscheduletaskComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
