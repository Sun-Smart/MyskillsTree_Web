import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bomenumasterComponent } from './bomenumaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bomenumasters', children: [
            { path: '', component: bomenumasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bomenumasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bomenumasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bomenumasterComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
