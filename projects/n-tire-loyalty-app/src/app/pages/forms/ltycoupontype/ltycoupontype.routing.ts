import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ltycoupontypeComponent } from './ltycoupontype.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'ltycoupontypes',children: [
{ path: '', component: ltycoupontypeComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: ltycoupontypeComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
