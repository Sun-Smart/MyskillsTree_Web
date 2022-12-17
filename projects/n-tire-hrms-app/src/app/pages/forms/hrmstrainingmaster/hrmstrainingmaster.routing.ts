import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmstrainingmasterComponent } from './hrmstrainingmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmstrainingmasters',children: [
{ path: '', component: hrmstrainingmasterComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmstrainingmasterComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
