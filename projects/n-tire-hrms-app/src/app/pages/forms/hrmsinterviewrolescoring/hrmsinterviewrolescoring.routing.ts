import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsinterviewrolescoringComponent } from './hrmsinterviewrolescoring.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsinterviewrolescorings',children: [
{ path: '', component: hrmsinterviewrolescoringComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsinterviewrolescoringComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsinterviewrolescoringComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsinterviewrolescoringComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
