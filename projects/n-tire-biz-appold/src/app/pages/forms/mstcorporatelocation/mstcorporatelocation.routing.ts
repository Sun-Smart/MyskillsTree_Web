import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mstcorporatelocationComponent } from './mstcorporatelocation.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'mstcorporatelocations', children: [
            { path: '', component: mstcorporatelocationComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: mstcorporatelocationComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: mstcorporatelocationComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: mstcorporatelocationComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
