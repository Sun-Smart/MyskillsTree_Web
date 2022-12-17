import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { lmscampaigntaskresponseComponent } from './lmscampaigntaskresponse.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'lmscampaigntaskresponses',children: [
{ path: '', component: lmscampaigntaskresponseComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: lmscampaigntaskresponseComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: lmscampaigntaskresponseComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
