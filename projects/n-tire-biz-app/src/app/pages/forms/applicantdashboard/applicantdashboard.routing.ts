import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { applicantdashboardComponent } from './applicantdashboard.component';
const routes: Routes = [
    {
        path: ':id',  component: applicantdashboardComponent
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
