import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mstjobrequirementComponent } from './mstjobrequirement.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'mstjobrequirements', children: [
            { path: '', component: mstjobrequirementComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: mstjobrequirementComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: mstjobrequirementComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: mstjobrequirementComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
