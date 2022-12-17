import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mstsegmentComponent } from './mstsegment.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'mstsegments', children: [
            { path: '', component: mstsegmentComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: mstsegmentComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: mstsegmentComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourceKey/:sourceid', component: mstsegmentComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
