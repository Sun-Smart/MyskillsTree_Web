import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { legalcaselawyerComponent } from './legalcaselawyer.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'legalcaselawyers',children: [
{ path: '', component: legalcaselawyerComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: legalcaselawyerComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: legalcaselawyerComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
