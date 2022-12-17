import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { proprocessgapComponent } from './proprocessgap.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'proprocessgaps',children: [
{ path: '', component: proprocessgapComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: proprocessgapComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: proprocessgapComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: proprocessgapComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
