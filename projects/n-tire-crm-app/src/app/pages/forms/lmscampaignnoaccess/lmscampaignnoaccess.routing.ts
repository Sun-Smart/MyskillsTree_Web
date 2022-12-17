import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { lmscampaignnoaccessComponent } from './lmscampaignnoaccess.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'lmscampaignnoaccesss',children: [
{ path: '', component: lmscampaignnoaccessComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: lmscampaignnoaccessComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: lmscampaignnoaccessComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
