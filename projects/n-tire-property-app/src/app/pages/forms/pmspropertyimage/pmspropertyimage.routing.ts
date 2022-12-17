import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pmspropertyimageComponent } from './pmspropertyimage.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'pmspropertyimages',children: [
{ path: '', component: pmspropertyimageComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: pmspropertyimageComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
