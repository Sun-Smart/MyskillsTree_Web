import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { legalcourtbranchmasterComponent } from './legalcourtbranchmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'legalcourtbranchmasters',children: [
{ path: '', component: legalcourtbranchmasterComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: legalcourtbranchmasterComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: legalcourtbranchmasterComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
