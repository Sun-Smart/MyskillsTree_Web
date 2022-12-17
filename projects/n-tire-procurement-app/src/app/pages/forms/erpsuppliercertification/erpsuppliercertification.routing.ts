import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpsuppliercertificationComponent } from './erpsuppliercertification.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpsuppliercertifications',children: [
{ path: '', component: erpsuppliercertificationComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpsuppliercertificationComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
