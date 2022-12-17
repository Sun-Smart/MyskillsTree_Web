import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ltycustomersegmentComponent } from './ltycustomersegment.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'ltycustomersegments',children: [
{ path: '', component: ltycustomersegmentComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: ltycustomersegmentComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
