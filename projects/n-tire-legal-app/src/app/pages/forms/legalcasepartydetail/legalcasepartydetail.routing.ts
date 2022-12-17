import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { legalcasepartydetailComponent } from './legalcasepartydetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'legalcasepartydetails',children: [
{ path: '', component: legalcasepartydetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: legalcasepartydetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: legalcasepartydetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
