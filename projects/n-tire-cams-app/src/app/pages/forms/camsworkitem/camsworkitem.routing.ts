import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { camsworkitemComponent } from './camsworkitem.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'camsworkitems',children: [
{ path: '', component: camsworkitemComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: camsworkitemComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
