import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bousergroupaccessComponent } from './bousergroupaccess.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bousergroupaccesss',children: [
{ path: '', component: bousergroupaccessComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bousergroupaccessComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
