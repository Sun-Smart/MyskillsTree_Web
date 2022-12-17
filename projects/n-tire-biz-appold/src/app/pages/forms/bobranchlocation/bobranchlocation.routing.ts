import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bobranchlocationComponent } from './bobranchlocation.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bobranchlocations', children: [
            { path: '', component: bobranchlocationComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bobranchlocationComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bobranchlocationComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bobranchlocationComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
