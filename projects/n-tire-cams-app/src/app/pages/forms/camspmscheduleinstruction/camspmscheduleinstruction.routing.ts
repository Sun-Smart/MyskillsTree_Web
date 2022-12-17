import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { camspmscheduleinstructionComponent } from './camspmscheduleinstruction.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'camspmscheduleinstructions',children: [
{ path: '', component: camspmscheduleinstructionComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: camspmscheduleinstructionComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
