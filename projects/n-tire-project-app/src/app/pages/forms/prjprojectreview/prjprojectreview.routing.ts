import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { prjprojectreviewComponent } from './prjprojectreview.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'prjprojectreviews', children: [
            { path: '', component: prjprojectreviewComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: prjprojectreviewComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
