import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bomeetingreminderComponent } from './bomeetingreminder.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bomeetingreminders',children: [
{ path: '', component: bomeetingreminderComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bomeetingreminderComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
