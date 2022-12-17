import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bodynamicformComponent } from './bodynamicform.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bodynamicforms', children: [
            { path: '', component: bodynamicformComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bodynamicformComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bodynamicformComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bodynamicformComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
