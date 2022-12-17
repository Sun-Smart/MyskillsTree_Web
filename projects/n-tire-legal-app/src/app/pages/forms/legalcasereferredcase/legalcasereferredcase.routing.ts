import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { legalcasereferredcaseComponent } from './legalcasereferredcase.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'legalcasereferredcases',children: [
{ path: '', component: legalcasereferredcaseComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: legalcasereferredcaseComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: legalcasereferredcaseComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
