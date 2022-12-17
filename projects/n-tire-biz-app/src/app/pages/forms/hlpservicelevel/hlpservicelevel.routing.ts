import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hlpservicelevelComponent } from './hlpservicelevel.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'hlpservicelevels', children: [
            { path: '', component: hlpservicelevelComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: hlpservicelevelComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: hlpservicelevelComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: hlpservicelevelComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
