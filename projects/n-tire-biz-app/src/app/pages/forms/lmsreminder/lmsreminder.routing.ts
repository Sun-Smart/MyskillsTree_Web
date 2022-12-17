import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { lmsreminderComponent } from './lmsreminder.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'lmsreminders', children: [
            { path: '', component: lmsreminderComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: lmsreminderComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: lmsreminderComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: lmsreminderComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
