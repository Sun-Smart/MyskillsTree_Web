import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { lmspostComponent } from './lmspost.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'lmsposts', children: [
            { path: '', component: lmspostComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: lmspostComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: lmspostComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: lmspostComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
