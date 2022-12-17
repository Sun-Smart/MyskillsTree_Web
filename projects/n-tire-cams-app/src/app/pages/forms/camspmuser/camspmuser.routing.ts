import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { camspmuserComponent } from './camspmuser.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'camspmusers',children: [
{ path: '', component: camspmuserComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: camspmuserComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
