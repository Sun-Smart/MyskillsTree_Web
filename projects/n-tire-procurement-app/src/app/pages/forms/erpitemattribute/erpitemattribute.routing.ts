import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpitemattributeComponent } from './erpitemattribute.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpitemattributes',children: [
{ path: '', component: erpitemattributeComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpitemattributeComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
