import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hlpticketComponent } from './hlpticket.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'hlptickets', children: [
            { path: '', component: hlpticketComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: hlpticketComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: hlpticketComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: hlpticketComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
