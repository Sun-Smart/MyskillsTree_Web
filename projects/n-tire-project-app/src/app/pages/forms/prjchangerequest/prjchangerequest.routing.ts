import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { prjchangerequestComponent } from './prjchangerequest.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'prjchangerequests',children: [
{ path: '', component: prjchangerequestComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: prjchangerequestComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
