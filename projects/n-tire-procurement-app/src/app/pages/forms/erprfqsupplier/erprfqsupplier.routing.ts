import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erprfqsupplierComponent } from './erprfqsupplier.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erprfqsuppliers',children: [
{ path: '', component: erprfqsupplierComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erprfqsupplierComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
