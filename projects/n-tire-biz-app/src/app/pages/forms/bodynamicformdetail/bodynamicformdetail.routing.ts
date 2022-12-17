import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bodynamicformdetailComponent } from './bodynamicformdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bodynamicformdetails', children: [
            { path: '', component: bodynamicformdetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bodynamicformdetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bodynamicformdetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bodynamicformdetailComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
