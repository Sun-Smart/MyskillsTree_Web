import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ecmspecialComponent } from './ecmspecial.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'ecmspecials',children: [
{ path: '', component: ecmspecialComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: ecmspecialComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
