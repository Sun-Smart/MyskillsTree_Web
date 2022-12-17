import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bousermasterComponent } from './bousermaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bousermasters', children: [
            { path: '', component: bousermasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bousermasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bousermasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bousermasterComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
