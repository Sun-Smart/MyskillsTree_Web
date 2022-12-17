import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsstatutoryroleComponent } from './hrmsstatutoryrole.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsstatutoryroles',children: [
{ path: '', component: hrmsstatutoryroleComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsstatutoryroleComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsstatutoryroleComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsstatutoryroleComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
