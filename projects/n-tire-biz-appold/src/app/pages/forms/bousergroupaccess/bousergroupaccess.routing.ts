import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bousergroupaccessComponent } from './bousergroupaccess.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bousergroupaccesss', children: [
            { path: '', component: bousergroupaccessComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bousergroupaccessComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bousergroupaccessComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bousergroupaccessComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
