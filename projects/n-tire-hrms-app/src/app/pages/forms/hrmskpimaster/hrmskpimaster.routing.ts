import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmskpimasterComponent } from './hrmskpimaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmskpimasters',children: [
{ path: '', component: hrmskpimasterComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmskpimasterComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmskpimasterComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmskpimasterComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
