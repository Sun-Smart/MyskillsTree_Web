import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { boteammemberComponent } from './boteammember.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'boteammembers',children: [
{ path: '', component: boteammemberComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: boteammemberComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
