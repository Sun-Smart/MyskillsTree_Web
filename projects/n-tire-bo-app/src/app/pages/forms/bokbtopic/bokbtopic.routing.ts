import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bokbtopicComponent } from './bokbtopic.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bokbtopics',children: [
{ path: '', component: bokbtopicComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bokbtopicComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
