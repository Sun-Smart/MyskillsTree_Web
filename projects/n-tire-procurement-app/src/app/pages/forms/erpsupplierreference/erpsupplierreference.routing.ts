import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpsupplierreferenceComponent } from './erpsupplierreference.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpsupplierreferences',children: [
{ path: '', component: erpsupplierreferenceComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpsupplierreferenceComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
