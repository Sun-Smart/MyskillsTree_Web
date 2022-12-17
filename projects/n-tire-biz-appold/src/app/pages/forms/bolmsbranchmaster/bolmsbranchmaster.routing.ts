import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bolmsbranchmasterComponent } from './bolmsbranchmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bolmsbranchmasters', children: [
            { path: '', component: bolmsbranchmasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bolmsbranchmasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bolmsbranchmasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bolmsbranchmasterComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
