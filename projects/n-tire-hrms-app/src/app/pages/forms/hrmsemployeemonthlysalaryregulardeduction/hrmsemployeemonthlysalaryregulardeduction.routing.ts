import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hrmsemployeemonthlysalaryregulardeductionComponent } from './hrmsemployeemonthlysalaryregulardeduction.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hrmsemployeemonthlysalaryregulardeductions',children: [
{ path: '', component: hrmsemployeemonthlysalaryregulardeductionComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hrmsemployeemonthlysalaryregulardeductionComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: hrmsemployeemonthlysalaryregulardeductionComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: hrmsemployeemonthlysalaryregulardeductionComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
