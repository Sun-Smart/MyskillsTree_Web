import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bomeetinginviteComponent } from './bomeetinginvite.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bomeetinginvites',children: [
{ path: '', component: bomeetinginviteComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bomeetinginviteComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
