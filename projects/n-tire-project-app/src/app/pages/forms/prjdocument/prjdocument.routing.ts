import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { prjdocumentComponent } from './prjdocument.component';

const routes: Routes = [
  {
    path: 'prjprjdocuments', children: [
      { path: '', component: prjdocumentComponent },
      { path: 'edit/:id', component: prjdocumentComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
