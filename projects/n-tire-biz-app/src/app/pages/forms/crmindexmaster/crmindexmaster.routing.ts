import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { crmindexmasterComponent } from './crmindexmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'crmindexmasters', children: [
            { path: '', component: crmindexmasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: crmindexmasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: crmindexmasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: crmindexmasterComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
