import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsemployeetrainingrequestComponent } from './hrmsemployeetrainingrequest.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'hrmsemployeetrainingrequests', children: [
            { path: '', component: hrmsemployeetrainingrequestComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: hrmsemployeetrainingrequestComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
