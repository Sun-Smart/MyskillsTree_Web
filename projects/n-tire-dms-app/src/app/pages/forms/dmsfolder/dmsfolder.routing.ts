import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { dmsfolderComponent } from './dmsfolder.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'dmsfolders',children: [
{ path: '', component: dmsfolderComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: dmsfolderComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
