import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ecmreviewComponent } from './ecmreview.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'ecmreviews',children: [
{ path: '', component: ecmreviewComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: ecmreviewComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
