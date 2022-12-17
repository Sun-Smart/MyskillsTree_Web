import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { prjtimecardComponent } from './prjtimecard.component';

const routes: Routes = [
  {
    path: 'prjtimecards', children: [
      { path: '', component: prjtimecardComponent },
      { path: 'edit/:id', component: prjtimecardComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
