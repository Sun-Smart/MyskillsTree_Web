import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { prjprojectdeliverableComponent } from './prjprojectdeliverable.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'prjprojectdeliverables',children: [
{ path: '', component: prjprojectdeliverableComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: prjprojectdeliverableComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: prjprojectdeliverableComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: prjprojectdeliverableComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
