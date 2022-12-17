import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bobranchsublocationComponent } from './bobranchsublocation.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bobranchsublocations',children: [
{ path: '', component: bobranchsublocationComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bobranchsublocationComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
