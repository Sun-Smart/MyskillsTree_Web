import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pmstransactionscheduleComponent } from './pmstransactionschedule.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'pmstransactionschedules',children: [
{ path: '', component: pmstransactionscheduleComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: pmstransactionscheduleComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
