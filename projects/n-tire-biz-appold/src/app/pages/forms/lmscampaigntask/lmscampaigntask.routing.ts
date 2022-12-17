import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { lmscampaigntaskComponent } from './lmscampaigntask.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'lmscampaigntasks', children: [
            { path: '', component: lmscampaigntaskComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: lmscampaigntaskComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: lmscampaigntaskComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: lmscampaigntaskComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
