import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpcontractorderclauseComponent } from './erpcontractorderclause.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpcontractorderclauses',children: [
{ path: '', component: erpcontractorderclauseComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpcontractorderclauseComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
