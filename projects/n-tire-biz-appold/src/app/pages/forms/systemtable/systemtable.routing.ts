import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { systemtableComponent } from './systemtable.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'systemtables', children: [
            { path: '', component: systemtableComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: systemtableComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: systemtableComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: systemtableComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
