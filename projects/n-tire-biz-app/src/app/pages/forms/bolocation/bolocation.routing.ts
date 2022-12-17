import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bolocationComponent } from './bolocation.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'bolocations', children: [
            { path: '', component: bolocationComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: bolocationComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: bolocationComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: bolocationComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
