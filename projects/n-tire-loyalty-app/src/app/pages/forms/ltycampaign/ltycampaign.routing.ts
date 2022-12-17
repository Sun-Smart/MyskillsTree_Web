import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ltycampaignComponent } from './ltycampaign.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'ltycampaigns',children: [
{ path: '', component: ltycampaignComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: ltycampaignComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
