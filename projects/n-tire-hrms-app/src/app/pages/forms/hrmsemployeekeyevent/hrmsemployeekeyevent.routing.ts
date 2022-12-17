import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsemployeekeyeventComponent } from './hrmsemployeekeyevent.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'hrmsemployeekeyevents', children: [
            { path: '', component: hrmsemployeekeyeventComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: hrmsemployeekeyeventComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
