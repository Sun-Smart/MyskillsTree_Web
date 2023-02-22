import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BODashboardViewerComponent } from './bodashboardviewer.component';

const routes: Routes = [
  {
    path: ':id', component: BODashboardViewerComponent
  },
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
