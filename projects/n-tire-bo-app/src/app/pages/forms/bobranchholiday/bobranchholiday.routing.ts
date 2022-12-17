import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bobranchholidayComponent } from './bobranchholiday.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bobranchholidays',children: [
{ path: '', component: bobranchholidayComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bobranchholidayComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
