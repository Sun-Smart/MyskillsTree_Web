import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { boreportdetailComponent } from './boreportdetail.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'boreportdetails',children: [
{ path: '', component: boreportdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: boreportdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
