import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsparesponseComponent } from './hrmsparesponse.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsparesponses',children: [
{ path: '', component: hrmsparesponseComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsparesponseComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsparesponseComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsparesponseComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
