import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mstcorporatemasterComponent } from './mstcorporatemaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'mstcorporatemasters', children: [
            { path: '', component: mstcorporatemasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: mstcorporatemasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: mstcorporatemasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'formtemplate/:templateid', component: mstcorporatemasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'usersource/:usersource', component: mstcorporatemasterComponent, canDeactivate: [CanDeactivateGuard] },
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
