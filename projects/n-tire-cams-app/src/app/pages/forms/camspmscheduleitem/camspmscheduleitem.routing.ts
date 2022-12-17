import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { camspmscheduleitemComponent } from './camspmscheduleitem.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'camspmscheduleitems',children: [
{ path: '', component: camspmscheduleitemComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: camspmscheduleitemComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
