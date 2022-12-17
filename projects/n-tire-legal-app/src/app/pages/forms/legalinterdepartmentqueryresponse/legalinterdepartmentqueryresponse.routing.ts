import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { legalinterdepartmentqueryresponseComponent } from './legalinterdepartmentqueryresponse.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'legalinterdepartmentqueryresponses',children: [
{ path: '', component: legalinterdepartmentqueryresponseComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: legalinterdepartmentqueryresponseComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: legalinterdepartmentqueryresponseComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
