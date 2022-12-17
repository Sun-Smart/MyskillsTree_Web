import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bootpvalidationdetailComponent } from './bootpvalidationdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bootpvalidationdetails', children: [
            { path: '', component: bootpvalidationdetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bootpvalidationdetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bootpvalidationdetailComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
