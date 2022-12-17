import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { lmsassignComponent } from './lmsassign.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'lmsassigns', children: [
            { path: '', component: lmsassignComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: lmsassignComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: lmsassignComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: lmsassignComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
