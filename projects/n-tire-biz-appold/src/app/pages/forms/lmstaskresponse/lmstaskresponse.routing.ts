import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { lmstaskresponseComponent } from './lmstaskresponse.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'lmstaskresponses', children: [
            { path: '', component: lmstaskresponseComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: lmstaskresponseComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: lmstaskresponseComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: lmstaskresponseComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
