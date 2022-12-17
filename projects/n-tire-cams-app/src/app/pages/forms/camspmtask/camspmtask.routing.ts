import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { camspmtaskComponent } from './camspmtask.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'camspmtasks', children: [
            { path: '', component: camspmtaskComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: camspmtaskComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
