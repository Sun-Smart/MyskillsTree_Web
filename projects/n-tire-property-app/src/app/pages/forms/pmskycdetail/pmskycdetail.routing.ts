import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pmskycdetailComponent } from './pmskycdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'pmskycdetails',children: [
{ path: '', component: pmskycdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: pmskycdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
