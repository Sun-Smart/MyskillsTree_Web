import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { crmcustomerkycmasterComponent } from './crmcustomerkycmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'crmcustomerkycmasters', children: [
            { path: '', component: crmcustomerkycmasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: crmcustomerkycmasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: crmcustomerkycmasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: crmcustomerkycmasterComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
