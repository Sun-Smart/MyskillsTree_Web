import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ltytransactiondetailComponent } from './ltytransactiondetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'ltytransactiondetails',children: [
{ path: '', component: ltytransactiondetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: ltytransactiondetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: ltytransactiondetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
