import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { prjprojectchangeComponent } from './prjprojectchange.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'prjprojectchanges',children: [
{ path: '', component: prjprojectchangeComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: prjprojectchangeComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
