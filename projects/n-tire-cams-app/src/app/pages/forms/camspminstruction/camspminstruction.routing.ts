import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { camspminstructionComponent } from './camspminstruction.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'camspminstructions',children: [
{ path: '', component: camspminstructionComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: camspminstructionComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
