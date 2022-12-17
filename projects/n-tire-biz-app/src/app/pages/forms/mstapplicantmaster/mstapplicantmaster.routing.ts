import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mstapplicantmasterComponent } from './mstapplicantmaster.component';
import { mstapplicantmasterviewComponent } from './mstapplicantmasterview.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
import { mstapplicantmastermainComponent } from './mstapplicantmastermain.component';
const routes: Routes = [
    {
        path: 'mstapplicantmasters', children: [
            { path: 'edit/:id/source/:sourcekey/:sourceid', pathMatch: 'prefix', component: mstapplicantmasterComponent, canDeactivate: [CanDeactivateGuard] },

            { path: 'edit/:id', pathMatch: 'prefix', component: mstapplicantmasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/menu/:menuhide', pathMatch: 'prefix', component: mstapplicantmasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', pathMatch: 'prefix', component: mstapplicantmasterviewComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: mstapplicantmasterviewComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'usersource/:usersource', pathMatch: 'prefix', component: mstapplicantmasterviewComponent, canDeactivate: [CanDeactivateGuard] },
           
            // { path: 'edit/:id', pathMatch: 'prefix', component: mstapplicantmastermainComponent, canDeactivate: [CanDeactivateGuard] },
            // { path: 'edit/:id/menu/:menuhide', pathMatch: 'prefix', component: mstapplicantmastermainComponent, canDeactivate: [CanDeactivateGuard] },
           
           
            { path: '', pathMatch: 'prefix', component: mstapplicantmasterComponent, canDeactivate: [CanDeactivateGuard] },
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
