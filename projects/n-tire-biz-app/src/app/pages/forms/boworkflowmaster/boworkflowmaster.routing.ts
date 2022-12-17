import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { boworkflowmasterComponent } from './boworkflowmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'boworkflowmasters', children: [
            { path: '', component: boworkflowmasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: boworkflowmasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: boworkflowmasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: boworkflowmasterComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
