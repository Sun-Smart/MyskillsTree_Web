import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { boprocessformComponent } from './boprocessform.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'boprocessforms',children: [
{ path: '', component: boprocessformComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: boprocessformComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
