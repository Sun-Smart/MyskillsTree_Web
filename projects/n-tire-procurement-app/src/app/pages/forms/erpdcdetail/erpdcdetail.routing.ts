import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpdcdetailComponent } from './erpdcdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpdcdetails',children: [
{ path: '', component: erpdcdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpdcdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
