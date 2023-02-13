import { Routes, RouterModule } from '@angular/router';
import { FaqComponent } from './faq.component';

const routes: Routes = [
  {
    path: 'faq', children: [
      { path: '', component: FaqComponent }
    ]
  },
];

export const FaqRoutes = RouterModule.forChild(routes);
