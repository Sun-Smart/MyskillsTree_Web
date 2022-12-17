import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pmspropertydocumentComponent } from './pmspropertydocument.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'pmspropertydocuments',children: [
{ path: '', component: pmspropertydocumentComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: pmspropertydocumentComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
