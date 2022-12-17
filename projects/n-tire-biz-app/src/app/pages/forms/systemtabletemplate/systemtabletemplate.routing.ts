import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { systemtabletemplateComponent } from './systemtabletemplate.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'systemtabletemplates', children: [
            { path: '', component: systemtabletemplateComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: systemtabletemplateComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: systemtabletemplateComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: systemtabletemplateComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
