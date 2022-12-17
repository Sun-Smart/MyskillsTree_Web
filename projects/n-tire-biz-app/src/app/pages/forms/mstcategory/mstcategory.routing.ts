import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mstcategoryComponent } from './mstcategory.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'mstcategories',children: [
{ path: '', component: mstcategoryComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: mstcategoryComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: mstcategoryComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourceKey/:sourceid', component: mstcategoryComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
