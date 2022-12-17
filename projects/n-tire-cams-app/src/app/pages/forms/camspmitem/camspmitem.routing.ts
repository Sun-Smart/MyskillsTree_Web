import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { camspmitemComponent } from './camspmitem.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'camspmitems',children: [
{ path: '', component: camspmitemComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: camspmitemComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
