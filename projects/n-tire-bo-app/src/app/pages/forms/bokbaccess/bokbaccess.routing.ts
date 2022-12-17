import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bokbaccessComponent } from './bokbaccess.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bokbaccesss',children: [
{ path: '', component: bokbaccessComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bokbaccessComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
