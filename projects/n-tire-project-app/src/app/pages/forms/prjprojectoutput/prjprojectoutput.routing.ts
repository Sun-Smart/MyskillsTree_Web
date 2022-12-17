import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { prjprojectoutputComponent } from './prjprojectoutput.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'prjprojectoutputs',children: [
{ path: '', component: prjprojectoutputComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: prjprojectoutputComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: prjprojectoutputComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: prjprojectoutputComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
