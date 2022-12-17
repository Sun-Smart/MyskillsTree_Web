import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpfachequestatusComponent } from './erpfachequestatus.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpfachequestatuss',children: [
{ path: '', component: erpfachequestatusComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpfachequestatusComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
