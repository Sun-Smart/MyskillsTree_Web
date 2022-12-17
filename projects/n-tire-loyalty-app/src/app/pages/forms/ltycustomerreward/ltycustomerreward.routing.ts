import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ltycustomerrewardComponent } from './ltycustomerreward.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'ltycustomerrewards',children: [
{ path: '', component: ltycustomerrewardComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: ltycustomerrewardComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: ltycustomerrewardComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
