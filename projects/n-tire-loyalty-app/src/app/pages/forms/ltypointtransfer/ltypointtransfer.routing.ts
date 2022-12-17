import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ltypointtransferComponent } from './ltypointtransfer.component';

const routes: Routes = [
  {
    path: 'ltypointtransfers', children: [
      { path: '', component: ltypointtransferComponent },
      { path: 'edit/:id', component: ltypointtransferComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
