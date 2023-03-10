import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
import { BonewbokbmasterComponent } from './bonewbokbmaster.component';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  { path: 'bokbmasters', children: [
    { path: '', component: BonewbokbmasterComponent},
    { path: 'edit/:id/menu/:menuhide', pathMatch: 'prefix', component: BonewbokbmasterComponent},
    { path: 'view/:viewid', pathMatch: 'prefix', component: BonewbokbmasterComponent},
    { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: BonewbokbmasterComponent},
    { path: 'edit/:id', component: BonewbokbmasterComponent},
    { path: 'edit/:id/source/:sourcekey/:sourceid', component: BonewbokbmasterComponent}
]},
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
