import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmscoffrequestComponent } from './hrmscoffrequest.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmscoffrequests',children: [
{ path: '', component: hrmscoffrequestComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmscoffrequestComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmscoffrequestComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmscoffrequestComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
