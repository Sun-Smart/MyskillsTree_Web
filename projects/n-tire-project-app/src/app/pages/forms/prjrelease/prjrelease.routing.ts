import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { prjreleaseComponent } from './prjrelease.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'prjreleases',children: [
{ path: '', component: prjreleaseComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: prjreleaseComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
