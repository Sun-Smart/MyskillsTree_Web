import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsemployeepublicationComponent } from './hrmsemployeepublication.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'hrmsemployeepublications', children: [
            { path: '', component: hrmsemployeepublicationComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: hrmsemployeepublicationComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
