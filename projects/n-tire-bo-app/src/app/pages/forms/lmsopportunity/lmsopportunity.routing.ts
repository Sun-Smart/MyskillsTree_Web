import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { lmsopportunityComponent } from './lmsopportunity.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'lmsopportunitys',children: [
{ path: '', component: lmsopportunityComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: lmsopportunityComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: lmsopportunityComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: lmsopportunityComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
