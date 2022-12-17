import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { vmsinvitepersonComponent } from './vmsinviteperson.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'vmsinvitepersons',children: [
{ path: '', component: vmsinvitepersonComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: vmsinvitepersonComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: vmsinvitepersonComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: vmsinvitepersonComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
