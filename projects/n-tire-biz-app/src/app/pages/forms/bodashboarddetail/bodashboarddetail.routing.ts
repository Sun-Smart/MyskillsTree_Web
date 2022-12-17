import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bodashboarddetailComponent } from './bodashboarddetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bodashboarddetails', children: [
            { path: '', component: bodashboarddetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bodashboarddetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bodashboarddetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bodashboarddetailComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
