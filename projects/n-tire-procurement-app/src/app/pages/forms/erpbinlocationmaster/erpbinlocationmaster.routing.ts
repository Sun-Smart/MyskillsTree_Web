import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpbinlocationmasterComponent } from './erpbinlocationmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpbinlocationmasters',children: [
{ path: '', component: erpbinlocationmasterComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpbinlocationmasterComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
