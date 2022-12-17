import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mstjobstatusComponent } from './mstjobstatus.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'mstjobstatuses', children: [
            { path: '', component: mstjobstatusComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: mstjobstatusComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: mstjobstatusComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: mstjobstatusComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
