import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erppurchaserequestdetailComponent } from './erppurchaserequestdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erppurchaserequestdetails',children: [
{ path: '', component: erppurchaserequestdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erppurchaserequestdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
