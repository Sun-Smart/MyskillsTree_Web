import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bocompanymasterComponent } from './bocompanymaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bocompanymasters', children: [
            { path: '', component: bocompanymasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bocompanymasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bocompanymasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bocompanymasterComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
