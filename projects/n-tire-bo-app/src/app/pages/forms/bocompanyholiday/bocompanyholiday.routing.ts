import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bocompanyholidayComponent } from './bocompanyholiday.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bocompanyholidays',children: [
{ path: '', component: bocompanyholidayComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bocompanyholidayComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
