import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpdcmasterComponent } from './erpdcmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpdcmasters',children: [
{ path: '', component: erpdcmasterComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpdcmasterComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
