import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { lmsopportunityComponent } from './lmsopportunity.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'lmsopportunities', children: [
            { path: '', component: lmsopportunityComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: lmsopportunityComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: lmsopportunityComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: lmsopportunityComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
