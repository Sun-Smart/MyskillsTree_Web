import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { boschedulerunComponent } from './boschedulerun.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'boscheduleruns',children: [
{ path: '', component: boschedulerunComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: boschedulerunComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
