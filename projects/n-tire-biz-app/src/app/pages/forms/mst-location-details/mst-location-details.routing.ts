import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MstLocationDetailsComponent } from './mst-location-details.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'personaldetails', children: [
      { path: '', component: MstLocationDetailsComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', pathMatch: 'prefix', component: MstLocationDetailsComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: MstLocationDetailsComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: MstLocationDetailsComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id/source/:sourcekey/:sourceid', component: MstLocationDetailsComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  },
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);