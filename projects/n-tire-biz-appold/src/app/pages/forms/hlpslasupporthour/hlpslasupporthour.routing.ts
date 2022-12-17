import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hlpslasupporthourComponent } from './hlpslasupporthour.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'hlpslasupporthours', children: [
            { path: '', component: hlpslasupporthourComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: hlpslasupporthourComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: hlpslasupporthourComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: hlpslasupporthourComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
