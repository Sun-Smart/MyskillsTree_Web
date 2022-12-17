import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mstapplicantachievementdetailComponent } from './mstapplicantachievementdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'mstapplicantachievementdetails', children: [
            { path: '', component: mstapplicantachievementdetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', pathMatch: 'prefix', component: mstapplicantachievementdetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: mstapplicantachievementdetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: mstapplicantachievementdetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: mstapplicantachievementdetailComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
