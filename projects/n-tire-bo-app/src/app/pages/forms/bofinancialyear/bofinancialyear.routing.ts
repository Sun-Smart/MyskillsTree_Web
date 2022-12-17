import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bofinancialyearComponent } from './bofinancialyear.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bofinancialyears',children: [
{ path: '', component: bofinancialyearComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bofinancialyearComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
