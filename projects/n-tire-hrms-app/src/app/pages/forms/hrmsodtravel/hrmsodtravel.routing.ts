import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsodtravelComponent } from './hrmsodtravel.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsodtravels',children: [
{ path: '', component: hrmsodtravelComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsodtravelComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsodtravelComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsodtravelComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
