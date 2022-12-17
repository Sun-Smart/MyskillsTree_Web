import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { legalcaseinterimorderComponent } from './legalcaseinterimorder.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'legalcaseinterimorders',children: [
{ path: '', component: legalcaseinterimorderComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: legalcaseinterimorderComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: legalcaseinterimorderComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
