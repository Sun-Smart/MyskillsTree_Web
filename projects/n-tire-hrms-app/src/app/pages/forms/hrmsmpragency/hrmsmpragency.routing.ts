import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsmpragencyComponent } from './hrmsmpragency.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsmpragencys',children: [
{ path: '', component: hrmsmpragencyComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsmpragencyComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsmpragencyComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsmpragencyComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
