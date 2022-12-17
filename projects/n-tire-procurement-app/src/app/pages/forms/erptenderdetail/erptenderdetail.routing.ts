import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erptenderdetailComponent } from './erptenderdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erptenderdetails',children: [
{ path: '', component: erptenderdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erptenderdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
