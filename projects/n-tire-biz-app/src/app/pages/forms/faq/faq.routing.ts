import { Routes, RouterModule } from '@angular/router';
import { FaqComponent } from './faq.component';
import { ModuleWithProviders } from '@angular/core';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  { path: 'bofaqs', children: [
    { path: '', component: FaqComponent},
    { path: 'edit/:id/menu/:menuhide', pathMatch: 'prefix', component: FaqComponent,canActivate:[CanDeactivateGuard]},
    { path: 'view/:viewid', pathMatch: 'prefix', component: FaqComponent,canActivate:[CanDeactivateGuard]},
    { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: FaqComponent,canActivate:[CanDeactivateGuard]},
    { path: 'edit/:id', component: FaqComponent,canActivate:[CanDeactivateGuard]},
    { path: 'edit/:id/source/:sourcekey/:sourceid', component: FaqComponent,canActivate:[CanDeactivateGuard]}
]},
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
