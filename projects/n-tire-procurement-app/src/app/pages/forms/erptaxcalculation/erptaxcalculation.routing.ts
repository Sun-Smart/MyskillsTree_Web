import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erptaxcalculationComponent } from './erptaxcalculation.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erptaxcalculations',children: [
{ path: '', component: erptaxcalculationComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erptaxcalculationComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
