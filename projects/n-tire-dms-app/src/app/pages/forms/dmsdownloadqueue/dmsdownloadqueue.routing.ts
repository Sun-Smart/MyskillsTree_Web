import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { dmsdownloadqueueComponent } from './dmsdownloadqueue.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'dmsdownloadqueues',children: [
{ path: '', component: dmsdownloadqueueComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: dmsdownloadqueueComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
