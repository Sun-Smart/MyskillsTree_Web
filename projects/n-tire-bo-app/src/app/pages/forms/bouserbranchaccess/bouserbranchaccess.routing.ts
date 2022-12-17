import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bouserbranchaccessComponent } from './bouserbranchaccess.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bouserbranchaccesss',children: [
{ path: '', component: bouserbranchaccessComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bouserbranchaccessComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
