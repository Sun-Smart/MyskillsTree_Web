import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { lmscampaignlocationComponent } from './lmscampaignlocation.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'lmscampaignlocations', children: [
            { path: '', component: lmscampaignlocationComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: lmscampaignlocationComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: lmscampaignlocationComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: lmscampaignlocationComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
