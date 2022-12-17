import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bolocationComponent } from './bolocation.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bolocations',children: [
{ path: '', component: bolocationComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bolocationComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
