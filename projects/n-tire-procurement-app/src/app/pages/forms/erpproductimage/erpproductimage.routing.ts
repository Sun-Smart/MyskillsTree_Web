import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpproductimageComponent } from './erpproductimage.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpproductimages',children: [
{ path: '', component: erpproductimageComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpproductimageComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
