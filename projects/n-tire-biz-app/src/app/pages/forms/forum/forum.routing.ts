import { Routes, RouterModule } from '@angular/router';
import { ForumComponent } from './forum.component';
const routes: Routes = [
  {
    path: 'forum', children: [
      { path: '', component:  ForumComponent}
    ]
  },
];

export const ForumRoutes = RouterModule.forChild(routes);
