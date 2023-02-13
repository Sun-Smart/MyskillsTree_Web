import { Routes, RouterModule } from '@angular/router';
import { bokbmasterComponent } from './bokbmaster.component';

const routes: Routes = [
  {
    path: 'bokbmaster', children: [
      { path: '', component: bokbmasterComponent }
    ]
   },
];

export const BokbmasterRoutes = RouterModule.forChild(routes);
