import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erptendercorrigendumComponent } from './erptendercorrigendum.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erptendercorrigendums',children: [
{ path: '', component: erptendercorrigendumComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erptendercorrigendumComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
