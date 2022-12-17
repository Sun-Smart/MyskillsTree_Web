import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bodocumentcontrolComponent } from './bodocumentcontrol.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bodocumentcontrols',children: [
{ path: '', component: bodocumentcontrolComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bodocumentcontrolComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
