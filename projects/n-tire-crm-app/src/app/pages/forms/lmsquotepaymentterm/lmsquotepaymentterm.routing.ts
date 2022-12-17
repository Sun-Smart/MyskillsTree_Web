import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { lmsquotepaymenttermComponent } from './lmsquotepaymentterm.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'lmsquotepaymentterms',children: [
{ path: '', component: lmsquotepaymenttermComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: lmsquotepaymenttermComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: lmsquotepaymenttermComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
