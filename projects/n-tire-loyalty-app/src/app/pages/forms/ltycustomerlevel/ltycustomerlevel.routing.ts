import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ltycustomerlevelComponent } from './ltycustomerlevel.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'ltycustomerlevels',children: [
{ path: '', component: ltycustomerlevelComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: ltycustomerlevelComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
