import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { autodetailComponent } from './autodetail.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'autodetails',children: [
{ path: '', component: autodetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: autodetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
