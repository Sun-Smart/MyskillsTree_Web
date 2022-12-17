import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmseosroleComponent } from './hrmseosrole.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmseosroles',children: [
{ path: '', component: hrmseosroleComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmseosroleComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmseosroleComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmseosroleComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
