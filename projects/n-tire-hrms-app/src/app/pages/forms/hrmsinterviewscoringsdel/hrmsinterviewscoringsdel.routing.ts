import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsinterviewscoringsdelComponent } from './hrmsinterviewscoringsdel.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsinterviewscoringsdels',children: [
{ path: '', component: hrmsinterviewscoringsdelComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsinterviewscoringsdelComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsinterviewscoringsdelComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsinterviewscoringsdelComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
