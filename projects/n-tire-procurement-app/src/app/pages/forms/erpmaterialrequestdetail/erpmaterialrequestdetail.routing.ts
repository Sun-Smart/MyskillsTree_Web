import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpmaterialrequestdetailComponent } from './erpmaterialrequestdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpmaterialrequestdetails',children: [
{ path: '', component: erpmaterialrequestdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpmaterialrequestdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
