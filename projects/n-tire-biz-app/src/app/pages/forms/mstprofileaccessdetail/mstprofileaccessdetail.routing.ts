import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mstprofileaccessdetailComponent } from './mstprofileaccessdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'mstprofileaccessdetails', children: [
            { path: '', component: mstprofileaccessdetailComponent, canDeactivate: [CanDeactivateGuard] },
            
            { path: 'view/:viewid', pathMatch: 'prefix', component: mstprofileaccessdetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: mstprofileaccessdetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: mstprofileaccessdetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: mstprofileaccessdetailComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
