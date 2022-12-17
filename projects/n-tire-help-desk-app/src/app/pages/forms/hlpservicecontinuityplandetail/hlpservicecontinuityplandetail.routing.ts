import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hlpservicecontinuityplandetailComponent } from './hlpservicecontinuityplandetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hlpservicecontinuityplandetails',children: [
{ path: '', component: hlpservicecontinuityplandetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hlpservicecontinuityplandetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
