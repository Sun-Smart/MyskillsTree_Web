import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsodadvanceComponent } from './hrmsodadvance.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsodadvances',children: [
{ path: '', component: hrmsodadvanceComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsodadvanceComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsodadvanceComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsodadvanceComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
