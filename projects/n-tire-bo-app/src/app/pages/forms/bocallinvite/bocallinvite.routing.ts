import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bocallinviteComponent } from './bocallinvite.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bocallinvites',children: [
{ path: '', component: bocallinviteComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bocallinviteComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
