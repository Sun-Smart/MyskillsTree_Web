import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hlpplannedactionComponent } from './hlpplannedaction.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'hlpplannedactions', children: [
            { path: '', component: hlpplannedactionComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: hlpplannedactionComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: hlpplannedactionComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: hlpplannedactionComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
