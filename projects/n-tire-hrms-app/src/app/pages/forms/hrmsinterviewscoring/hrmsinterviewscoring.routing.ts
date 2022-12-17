import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsinterviewscoringComponent } from './hrmsinterviewscoring.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsinterviewscorings',children: [
{ path: '', component: hrmsinterviewscoringComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsinterviewscoringComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsinterviewscoringComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsinterviewscoringComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
