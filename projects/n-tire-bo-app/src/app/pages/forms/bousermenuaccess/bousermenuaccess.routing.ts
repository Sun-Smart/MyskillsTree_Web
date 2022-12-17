import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bousermenuaccessComponent } from './bousermenuaccess.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bousermenuaccesss',children: [
{ path: '', component: bousermenuaccessComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bousermenuaccessComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
