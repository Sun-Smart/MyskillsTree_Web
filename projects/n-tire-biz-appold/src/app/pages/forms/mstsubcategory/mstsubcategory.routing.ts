import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mstsubcategoryComponent } from './mstsubcategory.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'mstsubcategories',children: [
{ path: '', component: mstsubcategoryComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: mstsubcategoryComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: mstsubcategoryComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourceKey/:sourceid', component: mstsubcategoryComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
