import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bouserbranchaccessComponent } from './bouserbranchaccess.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bouserbranchaccesss', children: [
            { path: '', component: bouserbranchaccessComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bouserbranchaccessComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bouserbranchaccessComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bouserbranchaccessComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
