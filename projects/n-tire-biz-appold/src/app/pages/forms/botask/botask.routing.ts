import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { botaskComponent } from './botask.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'botasks', children: [
            { path: '', component: botaskComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: botaskComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: botaskComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: botaskComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
