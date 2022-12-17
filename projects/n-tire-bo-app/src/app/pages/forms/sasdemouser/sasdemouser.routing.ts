import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { sasdemouserComponent } from './sasdemouser.component';

const routes: Routes = [
  {
    path: 'sasdemousers', children: [
      { path: '', component: sasdemouserComponent },
      { path: 'edit/:id', component: sasdemouserComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
