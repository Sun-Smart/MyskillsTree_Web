import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { camsdepreciationscheduleComponent } from './camsdepreciationschedule.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'camsdepreciationschedules',children: [
{ path: '', component: camsdepreciationscheduleComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: camsdepreciationscheduleComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
