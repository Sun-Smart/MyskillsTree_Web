import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { lmscallComponent } from './lmscall.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'lmscalls', children: [
            { path: '', component: lmscallComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: lmscallComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: lmscallComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: lmscallComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
