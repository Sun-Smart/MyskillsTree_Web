import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hlpslapriorityComponent } from './hlpslapriority.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'hlpslaprioritys', children: [
            { path: '', component: hlpslapriorityComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: hlpslapriorityComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: hlpslapriorityComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: hlpslapriorityComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
