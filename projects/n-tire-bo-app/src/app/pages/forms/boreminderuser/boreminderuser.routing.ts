import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { boreminderuserComponent } from './boreminderuser.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'boreminderusers',children: [
{ path: '', component: boreminderuserComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: boreminderuserComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
