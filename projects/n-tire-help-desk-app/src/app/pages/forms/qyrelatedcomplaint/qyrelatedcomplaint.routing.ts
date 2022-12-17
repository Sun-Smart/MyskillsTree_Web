import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { qyrelatedcomplaintComponent } from './qyrelatedcomplaint.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'qyrelatedcomplaints',children: [
{ path: '', component: qyrelatedcomplaintComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: qyrelatedcomplaintComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
