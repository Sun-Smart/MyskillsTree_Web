import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ecmcustomerbasketComponent } from './ecmcustomerbasket.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'ecmcustomerbaskets',children: [
{ path: '', component: ecmcustomerbasketComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: ecmcustomerbasketComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
