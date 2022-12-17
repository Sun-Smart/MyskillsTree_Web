import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bodynamicformdetailComponent } from './bodynamicformdetail.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bodynamicformdetails',children: [
{ path: '', component: bodynamicformdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bodynamicformdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
