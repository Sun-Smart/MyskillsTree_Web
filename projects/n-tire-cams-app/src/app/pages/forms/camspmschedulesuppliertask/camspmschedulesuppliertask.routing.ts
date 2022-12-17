import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { camspmschedulesuppliertaskComponent } from './camspmschedulesuppliertask.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'camspmschedulesuppliertasks',children: [
{ path: '', component: camspmschedulesuppliertaskComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: camspmschedulesuppliertaskComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
