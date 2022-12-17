import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { applicantdashboardComponent } from './applicantdashboard.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: ':id',  component: applicantdashboardComponent
 
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
