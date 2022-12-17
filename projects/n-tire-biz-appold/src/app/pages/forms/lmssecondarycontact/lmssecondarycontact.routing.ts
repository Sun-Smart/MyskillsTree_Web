import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { lmssecondarycontactComponent } from './lmssecondarycontact.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'lmssecondarycontacts', children: [
            { path: '', component: lmssecondarycontactComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: lmssecondarycontactComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: lmssecondarycontactComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: lmssecondarycontactComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
