import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { boworkflowstepComponent } from './boworkflowstep.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'boworkflowsteps', children: [
            { path: '', component: boworkflowstepComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: boworkflowstepComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: boworkflowstepComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: boworkflowstepComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
