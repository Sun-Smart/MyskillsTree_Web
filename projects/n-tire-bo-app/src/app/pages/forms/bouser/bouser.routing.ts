import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bouserComponent } from './bouser.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bousers',children: [
{ path: '', component: bouserComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bouserComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
