import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsemployeetrainingComponent } from './hrmsemployeetraining.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsemployeetrainings',children: [
{ path: '', component: hrmsemployeetrainingComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsemployeetrainingComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsemployeetrainingComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsemployeetrainingComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
