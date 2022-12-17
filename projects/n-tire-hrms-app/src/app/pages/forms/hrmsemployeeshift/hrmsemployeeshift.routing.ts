import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsemployeeshiftComponent } from './hrmsemployeeshift.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsemployeeshifts',children: [
{ path: '', component: hrmsemployeeshiftComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsemployeeshiftComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsemployeeshiftComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsemployeeshiftComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
