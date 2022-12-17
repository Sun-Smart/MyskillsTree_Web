import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { dmssubscriptionComponent } from './dmssubscription.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'dmssubscriptions',children: [
{ path: '', component: dmssubscriptionComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: dmssubscriptionComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
