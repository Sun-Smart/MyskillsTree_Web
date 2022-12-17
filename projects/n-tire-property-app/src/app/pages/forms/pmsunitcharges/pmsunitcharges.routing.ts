import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pmsunitchargesComponent } from './pmsunitcharges.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'pmsunitchargess',children: [
{ path: '', component: pmsunitchargesComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: pmsunitchargesComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: pmsunitchargesComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: pmsunitchargesComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
