import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bodashboardComponent } from './bodashboard.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bodashboards', children: [
            { path: '', component: bodashboardComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bodashboardComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bodashboardComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bodashboardComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
