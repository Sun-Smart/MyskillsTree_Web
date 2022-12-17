import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pmspropertyopexdetailComponent } from './pmspropertyopexdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'pmspropertyopexdetails',children: [
{ path: '', component: pmspropertyopexdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: pmspropertyopexdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
