import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { lmshistoryComponent } from './lmshistory.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'lmshistorys', children: [
            { path: '', component: lmshistoryComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: lmshistoryComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: lmshistoryComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: lmshistoryComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
