import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mstapplicantworkreferenceComponent } from './mstapplicantworkreference.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'mstapplicantworkreferences', children: [
            { path: '', component: mstapplicantworkreferenceComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', pathMatch: 'prefix', component: mstapplicantworkreferenceComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: mstapplicantworkreferenceComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: mstapplicantworkreferenceComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: mstapplicantworkreferenceComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
