import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bousertypemenuaccessComponent } from './bousertypemenuaccess.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bousertypemenuaccesss', children: [
            { path: '', component: bousertypemenuaccessComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bousertypemenuaccessComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bousertypemenuaccessComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bousertypemenuaccessComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
