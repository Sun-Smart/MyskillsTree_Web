import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mstapplicantcareerdetailComponent } from './mstapplicantcareerdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'mstapplicantcareerdetails', children: [
            { path: '', component: mstapplicantcareerdetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', pathMatch: 'prefix', component: mstapplicantcareerdetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: mstapplicantcareerdetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: mstapplicantcareerdetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: mstapplicantcareerdetailComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
