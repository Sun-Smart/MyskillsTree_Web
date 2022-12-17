import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ltyrewardsegmentComponent } from './ltyrewardsegment.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'ltyrewardsegments',children: [
{ path: '', component: ltyrewardsegmentComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: ltyrewardsegmentComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
