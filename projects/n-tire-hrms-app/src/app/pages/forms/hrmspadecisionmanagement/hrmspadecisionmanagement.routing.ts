import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmspadecisionmanagementComponent } from './hrmspadecisionmanagement.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmspadecisionmanagements',children: [
{ path: '', component: hrmspadecisionmanagementComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmspadecisionmanagementComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmspadecisionmanagementComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmspadecisionmanagementComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
