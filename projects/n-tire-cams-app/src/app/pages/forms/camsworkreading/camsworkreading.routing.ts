import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { camsworkreadingComponent } from './camsworkreading.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'camsworkreadings',children: [
{ path: '', component: camsworkreadingComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: camsworkreadingComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
