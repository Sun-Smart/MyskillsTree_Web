import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { camsassetdisposalplanComponent } from './camsassetdisposalplan.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'camsassetdisposalplans',children: [
{ path: '', component: camsassetdisposalplanComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: camsassetdisposalplanComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
