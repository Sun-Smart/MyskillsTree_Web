import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsmprapplicantComponent } from './hrmsmprapplicant.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsmprapplicants',children: [
{ path: '', component: hrmsmprapplicantComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsmprapplicantComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsmprapplicantComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsmprapplicantComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
