import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsmprassignComponent } from './hrmsmprassign.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsmprassigns',children: [
{ path: '', component: hrmsmprassignComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsmprassignComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsmprassignComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsmprassignComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
