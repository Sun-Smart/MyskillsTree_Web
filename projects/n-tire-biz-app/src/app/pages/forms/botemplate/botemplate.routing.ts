import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { botemplateComponent } from './botemplate.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'botemplates', children: [
            { path: '', component: botemplateComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: botemplateComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: botemplateComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: botemplateComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
