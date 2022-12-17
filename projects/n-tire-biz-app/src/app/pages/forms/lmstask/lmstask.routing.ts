import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { lmstaskComponent } from './lmstask.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'lmstasks', children: [
            { path: '', component: lmstaskComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: lmstaskComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: lmstaskComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: lmstaskComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
