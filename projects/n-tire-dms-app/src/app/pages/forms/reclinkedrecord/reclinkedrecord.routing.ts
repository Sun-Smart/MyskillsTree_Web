import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { reclinkedrecordComponent } from './reclinkedrecord.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'reclinkedrecords',children: [
{ path: '', component: reclinkedrecordComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: reclinkedrecordComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: reclinkedrecordComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
