import { Routes, RouterModule } from '@angular/router';
import { BonewbokbmasterComponent } from './bonewbokbmaster.component';

const routes: Routes = [
  { path: 'bokbmaster', children: [
    { path: '', component: BonewbokbmasterComponent }
  ] },
];

export const BonewbokbmasterRoutes = RouterModule.forChild(routes);
