import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpfacostcategoryComponent } from './erpfacostcategory.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpfacostcategorys',children: [
{ path: '', component: erpfacostcategoryComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpfacostcategoryComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
