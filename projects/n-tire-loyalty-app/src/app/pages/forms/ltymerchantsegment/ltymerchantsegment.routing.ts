import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ltymerchantsegmentComponent } from './ltymerchantsegment.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'ltymerchantsegments',children: [
{ path: '', component: ltymerchantsegmentComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: ltymerchantsegmentComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
