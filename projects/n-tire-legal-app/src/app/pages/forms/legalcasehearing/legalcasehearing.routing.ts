import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { legalcasehearingComponent } from './legalcasehearing.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'legalcasehearings',children: [
{ path: '', component: legalcasehearingComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: legalcasehearingComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: legalcasehearingComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: legalcasehearingComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
