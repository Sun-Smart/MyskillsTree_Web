import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bosubcategorymasterComponent } from './bosubcategorymaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bosubcategorymasters', children: [
            { path: '', component: bosubcategorymasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bosubcategorymasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bosubcategorymasterComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bosubcategorymasterComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
