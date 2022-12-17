import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bomasterdatatypeComponent } from './bomasterdatatype.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bomasterdatatypes', children: [
            { path: '', component: bomasterdatatypeComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bomasterdatatypeComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bomasterdatatypeComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bomasterdatatypeComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
