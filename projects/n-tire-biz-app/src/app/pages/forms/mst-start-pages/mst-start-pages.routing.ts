import { Routes, RouterModule } from '@angular/router';
import { MstStartPagesComponent } from './mst-start-pages.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'personaldetails', children: [
      { path: '', component: MstStartPagesComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', pathMatch: 'prefix', component: MstStartPagesComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: MstStartPagesComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: MstStartPagesComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id/source/:sourcekey/:sourceid', component: MstStartPagesComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  },
];

export const MstStartPagesRoutes = RouterModule.forChild(routes);
