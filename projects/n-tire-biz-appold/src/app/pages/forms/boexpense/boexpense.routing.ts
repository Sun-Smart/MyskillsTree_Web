import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { boexpenseComponent } from './boexpense.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'boexpenses', children: [
            { path: '', component: boexpenseComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: boexpenseComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: boexpenseComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: boexpenseComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
