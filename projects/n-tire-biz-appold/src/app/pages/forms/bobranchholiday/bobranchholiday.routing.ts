import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bobranchholidayComponent } from './bobranchholiday.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bobranchholidays', children: [
            { path: '', component: bobranchholidayComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bobranchholidayComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bobranchholidayComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bobranchholidayComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
