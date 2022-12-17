import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hlpslapriorityComponent } from './hlpslapriority.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hlpslapriorities',children: [
{ path: '', component: hlpslapriorityComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hlpslapriorityComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
