import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { camspmscheduleuserComponent } from './camspmscheduleuser.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'camspmscheduleusers',children: [
{ path: '', component: camspmscheduleuserComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: camspmscheduleuserComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
