import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpfachequebookComponent } from './erpfachequebook.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpfachequebooks',children: [
{ path: '', component: erpfachequebookComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpfachequebookComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
