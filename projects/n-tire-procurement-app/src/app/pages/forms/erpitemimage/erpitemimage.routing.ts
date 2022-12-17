import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpitemimageComponent } from './erpitemimage.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpitemimages',children: [
{ path: '', component: erpitemimageComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpitemimageComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
