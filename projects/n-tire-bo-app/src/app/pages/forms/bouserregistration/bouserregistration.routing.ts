import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bouserregistrationComponent } from './bouserregistration.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bouserregistrations',children: [
{ path: '', component: bouserregistrationComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bouserregistrationComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: bouserregistrationComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: bouserregistrationComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
