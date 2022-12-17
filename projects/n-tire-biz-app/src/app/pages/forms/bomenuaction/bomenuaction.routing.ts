import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bomenuactionComponent } from './bomenuaction.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bomenuactions', children: [
            { path: '', component: bomenuactionComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bomenuactionComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bomenuactionComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bomenuactionComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
