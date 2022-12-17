import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { msttermComponent } from './mstterm.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'mstterms',children: [
{ path: '', component: msttermComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: msttermComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: msttermComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourceKey/:sourceid', component: msttermComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
