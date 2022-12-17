import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmstrgfacultymasterComponent } from './hrmstrgfacultymaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmstrgfacultymasters',children: [
{ path: '', component: hrmstrgfacultymasterComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmstrgfacultymasterComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmstrgfacultymasterComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmstrgfacultymasterComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
