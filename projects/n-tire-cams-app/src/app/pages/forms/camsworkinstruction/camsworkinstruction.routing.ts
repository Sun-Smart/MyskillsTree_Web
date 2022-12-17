import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { camsworkinstructionComponent } from './camsworkinstruction.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'camsworkinstructions',children: [
{ path: '', component: camsworkinstructionComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: camsworkinstructionComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
