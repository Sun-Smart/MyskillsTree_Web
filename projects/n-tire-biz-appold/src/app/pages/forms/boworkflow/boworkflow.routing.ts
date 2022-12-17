import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { boworkflowComponent } from './boworkflow.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'boworkflows', children: [
            { path: '', component: boworkflowComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: boworkflowComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: boworkflowComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: boworkflowComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
