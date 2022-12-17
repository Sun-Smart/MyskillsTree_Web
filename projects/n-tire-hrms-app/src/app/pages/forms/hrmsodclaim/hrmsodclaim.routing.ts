import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsodclaimComponent } from './hrmsodclaim.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsodclaims',children: [
{ path: '', component: hrmsodclaimComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsodclaimComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsodclaimComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsodclaimComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
