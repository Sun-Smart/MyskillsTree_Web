import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pmspropertycontactComponent } from './pmspropertycontact.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'pmspropertycontacts',children: [
{ path: '', component: pmspropertycontactComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: pmspropertycontactComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
