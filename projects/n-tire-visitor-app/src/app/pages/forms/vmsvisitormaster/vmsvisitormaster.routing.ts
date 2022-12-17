import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { vmsvisitormasterComponent } from './vmsvisitormaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'vmsvisitormasters',children: [
{ path: '', component: vmsvisitormasterComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: vmsvisitormasterComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
