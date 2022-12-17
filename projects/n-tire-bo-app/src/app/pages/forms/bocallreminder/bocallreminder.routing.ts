import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bocallreminderComponent } from './bocallreminder.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bocallreminders',children: [
{ path: '', component: bocallreminderComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bocallreminderComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
