import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { boauditeventsComponent } from './boauditevents.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'boauditeventss',children: [
{ path: '', component: boauditeventsComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: boauditeventsComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
