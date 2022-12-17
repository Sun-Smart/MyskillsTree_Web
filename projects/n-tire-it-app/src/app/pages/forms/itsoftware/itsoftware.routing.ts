import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { itsoftwareComponent } from './itsoftware.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'itsoftwares',children: [
{ path: '', component: itsoftwareComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: itsoftwareComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
