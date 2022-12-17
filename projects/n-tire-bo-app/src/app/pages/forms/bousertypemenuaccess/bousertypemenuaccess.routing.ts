import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bousertypemenuaccessComponent } from './bousertypemenuaccess.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bousertypemenuaccesss',children: [
{ path: '', component: bousertypemenuaccessComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bousertypemenuaccessComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
