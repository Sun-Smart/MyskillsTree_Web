import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ltyloyaltyaudittrailComponent } from './ltyloyaltyaudittrail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'ltyloyaltyaudittrails',children: [
{ path: '', component: ltyloyaltyaudittrailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: ltyloyaltyaudittrailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
