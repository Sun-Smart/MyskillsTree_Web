import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mstapplicantskilldetailComponent } from './mstapplicantskilldetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'mstapplicantskilldetails', children: [
            { path: '', component: mstapplicantskilldetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', pathMatch: 'prefix', component: mstapplicantskilldetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: mstapplicantskilldetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: mstapplicantskilldetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: mstapplicantskilldetailComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
