import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpqcmasterComponent } from './erpqcmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpqcmasters',children: [
{ path: '', component: erpqcmasterComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpqcmasterComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
