import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bocompanyregistrationComponent } from './bocompanyregistration.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bocompanyregistrations',children: [
{ path: '', component: bocompanyregistrationComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bocompanyregistrationComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: bocompanyregistrationComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'formtemplate/:templateid', component: bocompanyregistrationComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'usersource/:usersource', component: bocompanyregistrationComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: bocompanyregistrationComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
