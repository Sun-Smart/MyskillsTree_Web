import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsapplicanteducationComponent } from './hrmsapplicanteducation.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsapplicanteducations',children: [
{ path: '', component: hrmsapplicanteducationComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsapplicanteducationComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsapplicanteducationComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsapplicanteducationComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
