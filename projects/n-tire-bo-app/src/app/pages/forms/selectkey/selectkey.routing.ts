import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { selectkeyComponent } from './selectkey.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'selectkeys', children: [
            { path: '', component: selectkeyComponent, canDeactivate: [CanDeactivateGuard] },
            { path: ':param/:reportcode', component: selectkeyComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: selectkeyComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
