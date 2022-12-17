import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { lmsproductmasterComponent } from './lmsproductmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'lmsproductmasters', children: [
            { path: '', component: lmsproductmasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: lmsproductmasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: lmsproductmasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: lmsproductmasterComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
