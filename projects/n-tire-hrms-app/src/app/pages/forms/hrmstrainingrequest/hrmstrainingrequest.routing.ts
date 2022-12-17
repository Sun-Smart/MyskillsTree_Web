import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmstrainingrequestComponent } from './hrmstrainingrequest.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmstrainingrequests',children: [
{ path: '', component: hrmstrainingrequestComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmstrainingrequestComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmstrainingrequestComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmstrainingrequestComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
