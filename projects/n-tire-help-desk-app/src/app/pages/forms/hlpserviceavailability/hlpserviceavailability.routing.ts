import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hlpserviceavailabilityComponent } from './hlpserviceavailability.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hlpserviceavailabilities',children: [
{ path: '', component: hlpserviceavailabilityComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hlpserviceavailabilityComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
