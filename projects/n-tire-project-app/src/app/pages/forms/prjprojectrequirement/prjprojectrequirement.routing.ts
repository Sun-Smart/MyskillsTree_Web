import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { prjprojectrequirementComponent } from './prjprojectrequirement.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'prjprojectrequirements',children: [
{ path: '', component: prjprojectrequirementComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: prjprojectrequirementComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: prjprojectrequirementComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: prjprojectrequirementComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
