import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { camsmisccostComponent } from './camsmisccost.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'camsmisccosts',children: [
{ path: '', component: camsmisccostComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: camsmisccostComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
