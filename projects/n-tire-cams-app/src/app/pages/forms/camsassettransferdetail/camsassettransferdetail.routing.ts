import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { camsassettransferdetailComponent } from './camsassettransferdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'camsassettransferdetails',children: [
{ path: '', component: camsassettransferdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: camsassettransferdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: camsassettransferdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: camsassettransferdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
