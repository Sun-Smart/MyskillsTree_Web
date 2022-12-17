import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmstrainingComponent } from './hrmstraining.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmstrainings',children: [
{ path: '', component: hrmstrainingComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmstrainingComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
