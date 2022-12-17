import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pmstransactionComponent } from './pmstransaction.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'pmstransactions',children: [
{ path: '', component: pmstransactionComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: pmstransactionComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
