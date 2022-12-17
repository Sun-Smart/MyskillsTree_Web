import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { crmcustomerservicedetailComponent } from './crmcustomerservicedetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'crmcustomerservicedetails', children: [
            { path: '', component: crmcustomerservicedetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: crmcustomerservicedetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: crmcustomerservicedetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: crmcustomerservicedetailComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
