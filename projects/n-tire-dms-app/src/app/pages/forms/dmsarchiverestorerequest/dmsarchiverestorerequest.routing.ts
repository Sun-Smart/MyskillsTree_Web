import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { dmsarchiverestorerequestComponent } from './dmsarchiverestorerequest.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'dmsarchiverestorerequests',children: [
{ path: '', component: dmsarchiverestorerequestComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: dmsarchiverestorerequestComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
