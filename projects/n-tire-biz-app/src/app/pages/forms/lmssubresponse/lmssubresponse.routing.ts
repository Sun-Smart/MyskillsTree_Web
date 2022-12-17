import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { lmssubresponseComponent } from './lmssubresponse.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'lmssubresponses', children: [
            { path: '', component: lmssubresponseComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: lmssubresponseComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: lmssubresponseComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: lmssubresponseComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
