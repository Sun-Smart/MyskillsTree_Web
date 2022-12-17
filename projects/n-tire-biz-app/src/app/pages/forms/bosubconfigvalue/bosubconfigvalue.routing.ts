import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bosubconfigvalueComponent } from './bosubconfigvalue.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bosubconfigvalues', children: [
            { path: '', component: bosubconfigvalueComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bosubconfigvalueComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bosubconfigvalueComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bosubconfigvalueComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
