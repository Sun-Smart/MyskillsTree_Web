import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsapplicantskillComponent } from './hrmsapplicantskill.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsapplicantskills',children: [
{ path: '', component: hrmsapplicantskillComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsapplicantskillComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsapplicantskillComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsapplicantskillComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
