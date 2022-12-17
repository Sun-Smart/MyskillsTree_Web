import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { legalcaseagainstemployeeComponent } from './legalcaseagainstemployee.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'legalcaseagainstemployees',children: [
{ path: '', component: legalcaseagainstemployeeComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: legalcaseagainstemployeeComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: legalcaseagainstemployeeComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
