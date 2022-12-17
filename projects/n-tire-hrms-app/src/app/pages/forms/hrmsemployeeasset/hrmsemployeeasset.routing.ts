import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsemployeeassetComponent } from './hrmsemployeeasset.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'hrmsemployeeassets', children: [
            { path: '', component: hrmsemployeeassetComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: hrmsemployeeassetComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
