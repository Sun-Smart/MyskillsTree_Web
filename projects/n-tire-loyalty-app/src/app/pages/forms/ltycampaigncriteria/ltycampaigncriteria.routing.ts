import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ltycampaigncriteriaComponent } from './ltycampaigncriteria.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'ltycampaigncriterias',children: [
{ path: '', component: ltycampaigncriteriaComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: ltycampaigncriteriaComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
