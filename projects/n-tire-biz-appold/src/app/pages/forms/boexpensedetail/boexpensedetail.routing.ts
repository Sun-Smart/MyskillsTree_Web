import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { boexpensedetailComponent } from './boexpensedetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'boexpensedetails', children: [
            { path: '', component: boexpensedetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: boexpensedetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: boexpensedetailComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: boexpensedetailComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
