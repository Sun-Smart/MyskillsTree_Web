import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsapplicantcareerComponent } from './hrmsapplicantcareer.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsapplicantcareers',children: [
{ path: '', component: hrmsapplicantcareerComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsapplicantcareerComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsapplicantcareerComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsapplicantcareerComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
