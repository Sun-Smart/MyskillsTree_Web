import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hlpticketdetailComponent } from './hlpticketdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hlpticketdetails',children: [
{ path: '', component: hlpticketdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hlpticketdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
