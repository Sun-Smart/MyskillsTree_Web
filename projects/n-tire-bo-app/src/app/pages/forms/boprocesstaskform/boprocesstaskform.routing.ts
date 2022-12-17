import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { boprocesstaskformComponent } from './boprocesstaskform.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'boprocesstaskforms',children: [
{ path: '', component: boprocesstaskformComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: boprocesstaskformComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
