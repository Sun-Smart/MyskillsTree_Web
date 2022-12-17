import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { camspmsuppliertaskComponent } from './camspmsuppliertask.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'camspmsuppliertasks',children: [
{ path: '', component: camspmsuppliertaskComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: camspmsuppliertaskComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
