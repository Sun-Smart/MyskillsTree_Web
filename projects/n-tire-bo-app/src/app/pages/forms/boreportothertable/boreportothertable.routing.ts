import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { boreportothertableComponent } from './boreportothertable.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'boreportothertables',children: [
{ path: '', component: boreportothertableComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: boreportothertableComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
