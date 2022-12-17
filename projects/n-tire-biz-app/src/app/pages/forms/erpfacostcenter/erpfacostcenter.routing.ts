import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpfacostcenterComponent } from './erpfacostcenter.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'erpfacostcenters', children: [
            { path: '', component: erpfacostcenterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: erpfacostcenterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: erpfacostcenterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: erpfacostcenterComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
