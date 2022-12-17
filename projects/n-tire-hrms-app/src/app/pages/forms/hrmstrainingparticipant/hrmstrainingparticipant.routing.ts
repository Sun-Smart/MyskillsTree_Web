import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmstrainingparticipantComponent } from './hrmstrainingparticipant.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmstrainingparticipants',children: [
{ path: '', component: hrmstrainingparticipantComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmstrainingparticipantComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmstrainingparticipantComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmstrainingparticipantComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
