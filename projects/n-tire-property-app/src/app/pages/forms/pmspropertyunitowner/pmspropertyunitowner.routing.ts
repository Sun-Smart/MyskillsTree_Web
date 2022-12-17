import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pmspropertyunitownerComponent } from './pmspropertyunitowner.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'pmspropertyunitowners',children: [
{ path: '', component: pmspropertyunitownerComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: pmspropertyunitownerComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
