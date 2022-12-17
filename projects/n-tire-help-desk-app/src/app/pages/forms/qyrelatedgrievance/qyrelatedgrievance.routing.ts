import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { qyrelatedgrievanceComponent } from './qyrelatedgrievance.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'qyrelatedgrievances',children: [
{ path: '', component: qyrelatedgrievanceComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: qyrelatedgrievanceComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
