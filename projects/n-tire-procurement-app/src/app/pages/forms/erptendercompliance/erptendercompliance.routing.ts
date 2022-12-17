import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erptendercomplianceComponent } from './erptendercompliance.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erptendercompliances',children: [
{ path: '', component: erptendercomplianceComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erptendercomplianceComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
