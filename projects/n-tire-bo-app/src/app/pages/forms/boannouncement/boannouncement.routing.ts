import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { boannouncementComponent } from './boannouncement.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'boannouncements',children: [
{ path: '', component: boannouncementComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: boannouncementComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
