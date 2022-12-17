import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erptenderaccessComponent } from './erptenderaccess.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erptenderaccesss',children: [
{ path: '', component: erptenderaccessComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erptenderaccessComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
