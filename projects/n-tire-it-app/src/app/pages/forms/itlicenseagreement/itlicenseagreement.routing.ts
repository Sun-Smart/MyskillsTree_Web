import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { itlicenseagreementComponent } from './itlicenseagreement.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'itlicenseagreements',children: [
{ path: '', component: itlicenseagreementComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: itlicenseagreementComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
