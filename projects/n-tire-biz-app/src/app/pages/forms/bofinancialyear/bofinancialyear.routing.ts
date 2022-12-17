import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bofinancialyearComponent } from './bofinancialyear.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bofinancialyears', children: [
            { path: '', component: bofinancialyearComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bofinancialyearComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bofinancialyearComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bofinancialyearComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
