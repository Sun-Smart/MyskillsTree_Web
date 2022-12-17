import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ltyeventsegmentComponent } from './ltyeventsegment.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'ltyeventsegments',children: [
{ path: '', component: ltyeventsegmentComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: ltyeventsegmentComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
