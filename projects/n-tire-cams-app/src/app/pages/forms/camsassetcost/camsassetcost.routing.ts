import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { camsassetcostComponent } from './camsassetcost.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'camsassetcosts',children: [
{ path: '', component: camsassetcostComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: camsassetcostComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
