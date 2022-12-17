import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { prjprojectteammemberComponent } from './prjprojectteammember.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'prjprojectteammembers',children: [
{ path: '', component: prjprojectteammemberComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: prjprojectteammemberComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: prjprojectteammemberComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: prjprojectteammemberComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
