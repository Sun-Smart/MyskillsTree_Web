import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pmspropertyunitComponent } from './pmspropertyunit.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'pmspropertyunits',children: [
{ path: '', component: pmspropertyunitComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: pmspropertyunitComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
