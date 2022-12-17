import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hlpticketComponent } from './hlpticket.component';

const routes: Routes = [
  {
    path: 'hlptickets', children: [
      { path: '', component: hlpticketComponent },
      { path: 'edit/:id', component: hlpticketComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
