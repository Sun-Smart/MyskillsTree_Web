import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsemployeedependentComponent } from './hrmsemployeedependent.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsemployeedependents',children: [
{ path: '', component: hrmsemployeedependentComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsemployeedependentComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsemployeedependentComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsemployeedependentComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
