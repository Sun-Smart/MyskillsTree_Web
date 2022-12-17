import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bocompanyholidayComponent } from './bocompanyholiday.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bocompanyholidays', children: [
            { path: '', component: bocompanyholidayComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bocompanyholidayComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bocompanyholidayComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bocompanyholidayComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
