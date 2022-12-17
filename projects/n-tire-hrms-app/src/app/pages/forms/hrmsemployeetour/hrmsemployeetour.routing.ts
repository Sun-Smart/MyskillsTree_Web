import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsemployeetourComponent } from './hrmsemployeetour.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'hrmsemployeetours', children: [
            { path: '', component: hrmsemployeetourComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: hrmsemployeetourComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
