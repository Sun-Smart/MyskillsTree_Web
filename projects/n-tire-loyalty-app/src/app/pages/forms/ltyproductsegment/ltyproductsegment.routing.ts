import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ltyproductsegmentComponent } from './ltyproductsegment.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'ltyproductsegments',children: [
{ path: '', component: ltyproductsegmentComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: ltyproductsegmentComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
