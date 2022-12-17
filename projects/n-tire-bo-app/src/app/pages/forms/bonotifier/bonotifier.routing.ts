import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bonotifierComponent } from './bonotifier.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bonotifiers',children: [
{ path: '', component: bonotifierComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bonotifierComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
