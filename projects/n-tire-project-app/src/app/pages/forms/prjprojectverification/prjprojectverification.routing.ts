import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { prjprojectverificationComponent } from './prjprojectverification.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'prjprojectverifications',children: [
{ path: '', component: prjprojectverificationComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: prjprojectverificationComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: prjprojectverificationComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: prjprojectverificationComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
